/* Integration regression checks against the actual locally bundled module. */
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {execFileSync}=require('node:child_process');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
fs.mkdirSync(path.join(root,'test-results'),{recursive:true});
const version=JSON.parse(fs.readFileSync(path.join(root,'custom_components/light_manager/manifest.json'))).version;
const fixture=JSON.parse(execFileSync('python3',['-c',`import sys,json;sys.path.insert(0,'tests');from test_engine import fixture,program,action;print(json.dumps(fixture(program('Evening','time',[action('on'),action('off',mode='off')]),program('Second','time',[action('second')]),program('Motion','motion',[action('motion',sensors=['binary_sensor.bewegung'])],pause_in_vacation=True))))`],{cwd:root,encoding:'utf8'}));
const server=http.createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost');
 if(url.pathname==='/'){res.setHeader('Content-Type','text/html');res.end('<html lang="de"><style>body{margin:12px;font-family:Arial;--primary-color:#81d4fa}light-manager-card{display:block;max-width:800px;margin:auto}</style><light-manager-card></light-manager-card></html>');return;}
 const file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){res.statusCode=404;res.end();return;}
 res.setHeader('Content-Type',file.endsWith('.js')?'application/javascript':'application/octet-stream');
 res.end(fs.readFileSync(file));
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||undefined,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1100,height:1000},locale:'de-DE'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
 await page.goto('http://127.0.0.1:'+server.address().port);
 await page.addScriptTag({type:'module',url:'/custom_components/light_manager/frontend/light-manager-card.js'});
 await page.waitForFunction(()=>customElements.get('light-manager-card'));
 await page.exposeFunction('validateConfig',config=>{
  const result=JSON.parse(execFileSync('python3',['tests/validate_ui.py'],{cwd:root,input:JSON.stringify(config),encoding:'utf8'}));
  if(!result.ok)throw Error(result.error);
 });
 await page.evaluate(({fixture,version})=>{
  const catalog=[
   {entity:'light.flur',name:'Hall light',state:'off',attributes:{supported_color_modes:['color_temp','rgb'],min_color_temp_kelvin:2000,max_color_temp_kelvin:6500}},
   {entity:'binary_sensor.tuer',name:'Door',state:'off',attributes:{device_class:'door'}},
   {entity:'binary_sensor.bewegung',name:'Motion',state:'off',attributes:{device_class:'motion'}},
   {entity:'sensor.lux',name:'Illuminance',state:'42',attributes:{device_class:'illuminance',unit_of_measurement:'lx'}}
  ];
  window.host={config:fixture,revision:0,calls:[]};
  const card=document.querySelector('light-manager-card');
  card.hass={user:{id:'test'},states:Object.fromEntries(catalog.map(x=>[x.entity,{state:x.state,attributes:{...x.attributes,friendly_name:x.name}}])),callWS:async msg=>{
   host.calls.push(msg);
   if(msg.type==='light_manager/save'){if(host.failSave)throw Error('Save denied');await window.validateConfig(msg.config);host.config=structuredClone(msg.config);host.revision++;}
   return {version,schema:4,revision:host.revision,config:structuredClone(host.config),catalog,status:{'light.flur':{kind:'time',mode:'on',program:'Evening'}},rules:[],warnings:[],history:[],daily_history:[{time:'2026-11-10T08:00:00Z',entities:['light.flur'],action:{mode:'off'},error:false}],planned:[],areas:[],lamp_areas:{},sun:{sunrise:'2026-11-10T06:30:00Z',sunset:'2026-11-10T16:00:00Z'},today:'2026-11-10',timezone:'Europe/Berlin'};
  }};
 },{fixture,version});
 await page.locator('[data-op="add"]').waitFor();
 assert.equal(await page.locator('[data-op="add"][data-section="programs"] svg').count(),0);
 assert.equal(await page.locator('[data-op="add"][data-section="programs"]').innerText(),'+ Programm');
 assert.equal(await page.locator('[data-op="move-program"]').first().innerText(),'↑');
 assert.equal(await page.locator('[data-op="move-program"]').nth(1).innerText(),'↓');
 assert.equal(await page.locator('[data-op="move-program"] svg').count(),0);
 assert.equal(await page.locator('.program-add').count(),1);
 assert.equal(await page.locator('[data-op="move-program"]').first().isDisabled(),true);
 assert.equal(await page.locator('[data-op="move-program"]').nth(3).isDisabled(),true);
 assert.equal(await page.locator('[data-op="move-program"]').nth(1).evaluate(e=>getComputedStyle(e).color),'rgb(129, 212, 250)');
 await page.locator('[data-op="move-program"]').nth(1).click();
 await page.waitForFunction(()=>host.config.programs[0].name==='Second');
 await page.locator('[data-op="move-program"]').nth(1).click();
 await page.waitForFunction(()=>host.config.programs[0].name==='Evening');
 const nav=id=>page.locator('[data-action="navigate"][data-page="'+id+'"]');
 const section=id=>page.locator('[data-settings="'+id+'"] > .settings-heading-row > .settings-fold');
 for(const width of [1100,390,320]){
  await page.setViewportSize({width,height:1000});
  await nav('settings').click();
  await section('lamps').click();
  await section('sensors').click();
  assert.equal(await section('lamps').getAttribute('aria-expanded'),'true');
  await page.evaluate(()=>document.querySelector('light-manager-card').render());
  assert.equal(await section('lamps').getAttribute('aria-expanded'),'true');
  assert.equal(await page.locator('[data-settings="sensors"] [data-op="edit"]').count(),3);
  assert.equal(await page.evaluate(()=>{const c=document.querySelector('light-manager-card');return c.shadowRoot.querySelector('ha-card').scrollWidth>c.clientWidth}),false);
  assert.equal(await page.locator('[data-page="settings"] .ui-icon').getAttribute('data-icon'),'settings');
  assert.equal(await nav('settings').evaluate(e=>getComputedStyle(e).color),'rgb(129, 212, 250)');
  await nav('programs').click();
  const controls=page.locator('.program-head').first().locator('.list-tools');
  if(width<600){assert.equal(await controls.locator('[data-op="copy-program"]').isVisible(),false);assert.equal(await controls.locator('.program-order').isVisible(),false);}
  assert.equal(await page.locator('[data-op="filter-vacation"]').count(),0);
  assert.equal(await page.locator('.program-title').count(),3);
  const group=page.locator('[data-program-group="time"]');
  const geometry=await group.evaluate(e=>{const h=e.getBoundingClientRect(),c=e.lastElementChild.getBoundingClientRect();return {right:h.right-c.right,count:e.lastElementChild.textContent};});
  assert.equal(geometry.count,'2');assert.ok(Math.abs(geometry.right)<1);
  await group.click();
  assert.equal(await group.getAttribute('aria-expanded'),'false');
  await page.evaluate(()=>document.querySelector('light-manager-card').render());
  assert.equal(await group.getAttribute('aria-expanded'),'false');
  assert.equal(await page.locator('#lm-program-group-time-content').isVisible(),false);
  await group.click();
  assert.equal(await page.locator('#lm-program-group-time-content').isVisible(),true);
  const edit=page.locator('[data-op="edit"][data-section="programs"]').first();
  await edit.click();
  assert.equal(await page.locator('dialog').evaluate(e=>e.open),true);
  await page.locator('[data-path="name"]').fill('Evening edited '+width);
  await page.evaluate(()=>document.querySelector('light-manager-card').refresh());
  assert.equal(await page.locator('[data-path="name"]').inputValue(),'Evening edited '+width);
  assert.equal(await page.locator('[data-path="name"]').evaluate(e=>e.getRootNode().activeElement===e),true);
  assert.equal(await page.locator('.choices.days input:checked').count(),7);
  await page.locator('[data-op="fold-action"]').first().click();
  assert.equal(await page.locator('[data-brightness="0"]').count(),1);
  await page.screenshot({path:path.join(root,'test-results/kit-qa-dialog-'+width+'.png'),fullPage:true});
  assert.equal(await page.locator('dialog').evaluate(e=>e.scrollWidth>e.clientWidth),false);
  await page.locator('[data-path="name"]').focus();
  await page.keyboard.press('Shift+Tab');
  assert.equal(await page.evaluate(()=>document.querySelector('light-manager-card').shadowRoot.activeElement.closest('dialog')!==null),true);
  await page.locator('[data-op="commit"]').click();
  await page.locator('dialog').waitFor({state:'detached'});
  assert.equal(await page.evaluate(()=>host.config.programs[0].name),'Evening edited '+width);
  await edit.click();
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('dialog').count(),0);
  const png=path.join(root,'test-results/kit-qa-'+width+'.png');
  await page.screenshot({path:png,fullPage:true});
 }
 await nav('programs').click();
 const programSwitch=page.locator('.program-head .toggle').first();
 await programSwitch.click();
 assert.equal(await page.evaluate(()=>host.config.programs[0].enabled),false);
 await page.locator('.program-head .toggle').first().click();
 assert.equal(await page.evaluate(()=>host.config.programs[0].enabled),true);
 await page.locator('[data-op="edit"][data-section="programs"]').last().click();
 await page.locator('[data-op="fold-action"]').first().click();
 assert.equal(await page.locator('[data-array="actions.0.sensors"]').count(),1);
 await page.locator('[data-path="name"]').fill('Motion retained after failure');
 await page.evaluate(()=>host.failSave=true);
 await page.locator('[data-op="commit"]').click();
 await page.getByRole('alert').filter({hasText:'Save denied'}).waitFor();
 assert.equal(await page.locator('[data-path="name"]').inputValue(),'Motion retained after failure');
 assert.equal(await page.locator('dialog').evaluate(e=>e.open),true);
 await page.evaluate(()=>host.failSave=false);
 await page.locator('[data-op="commit"]').click();
 await page.locator('dialog').waitFor({state:'detached'});
 await nav('settings').click();assert.equal(await page.locator('[data-vacation]').count(),1);await page.locator('[data-language="en"]').click();
 assert.ok((await page.locator('.version-info').innerText()).includes('UI 1.2.0'));
 await section('sensors').click();
 await page.locator('[data-op="edit"][data-section="sensors"]').first().click();
 await page.locator('[data-path="name"]').fill('Door renamed');
 await page.locator('[data-op="commit"]').click();
 await page.locator('dialog').waitFor({state:'detached'});
 assert.equal(await page.evaluate(()=>host.config.sensors[0].name),'Door renamed');
 await page.evaluate(()=>{document.documentElement.style.setProperty('--ha-card-background','#202020');document.documentElement.style.setProperty('--primary-text-color','#eeeeee');document.documentElement.style.setProperty('--secondary-text-color','#bbbbbb');});
 assert.equal(await page.locator('ha-card').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(32, 32, 32)');
 await page.screenshot({path:path.join(root,'test-results/kit-qa-dark.png'),fullPage:true});
 await nav('help').click();
 assert.ok((await page.locator('.guide').innerText()).includes('HA UI Kit 1.2.0'));
 assert.deepEqual(errors,[]);
 console.log('UI Kit migration passed: desktop/mobile, DE/EN, themes, settings folds, names, group counts and folds, program editing, native dialog and Escape.');
 await browser.close();server.close();
})().catch(e=>{console.error(e);server.close();process.exit(1)});
