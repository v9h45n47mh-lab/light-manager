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
  window.host={config:fixture,revision:0,calls:[],catalog,alarmSchedule:{items:[],incomplete:false}};
  const card=document.querySelector('light-manager-card');
  card.hass={user:{id:'test'},states:Object.fromEntries(catalog.map(x=>[x.entity,{state:x.state,attributes:{...x.attributes,friendly_name:x.name}}])),callWS:async msg=>{
   host.calls.push(msg);
   if(msg.type==='light_manager/save'){if(host.failSave)throw Error('Save denied');await window.validateConfig(msg.config);host.config=structuredClone(msg.config);host.revision++;}
   return {version,schema:4,revision:host.revision,config:structuredClone(host.config),catalog,status:{'light.flur':{kind:'time',mode:'on',program:'Evening'}},rules:[],warnings:[],history:[],alarm_schedule:host.alarmSchedule,daily_history:[{time:'2026-11-10T08:00:00Z',entities:['light.flur'],action:{mode:'off'},error:false}],planned:(host.planned||[]).map(row=>{const time=host.config.programs.find(p=>p.id===row.program)?.actions.find(a=>a.id===row.action)?.reschedules?.[row.date];return time?{...row,due:row.date+'T'+time+':00+01:00'}:row;}),areas:[],lamp_areas:{},sun:{sunrise:'2026-11-10T06:30:00Z',sunset:'2026-11-10T16:00:00Z'},today:host.today||'2026-11-10',timezone:'Europe/Berlin'};
  }};
 },{fixture,version});
 await page.locator('[data-op="add"]').waitFor();
 assert.equal(await page.locator('[data-op="add"][data-section="programs"] svg').count(),0);
 assert.equal(await page.locator('[data-op="add"][data-section="programs"]').innerText(),'+ Programm');
 assert.equal(await page.locator('[data-action="move-program"]').first().innerText(),'↑');
 assert.equal(await page.locator('[data-action="move-program"]').nth(1).innerText(),'↓');
 assert.equal(await page.locator('[data-action="move-program"] svg').count(),0);
 assert.equal(await page.locator('.program-add').count(),1);
 assert.equal(await page.locator('[data-action="move-program"]').first().isDisabled(),true);
 assert.equal(await page.locator('[data-action="move-program"]').nth(3).isDisabled(),true);
 assert.equal(await page.locator('[data-action="move-program"]').nth(1).evaluate(e=>getComputedStyle(e).color),'rgb(129, 212, 250)');
 await page.locator('[data-action="move-program"]').nth(1).click();
 await page.waitForFunction(()=>host.config.programs[0].name==='Second');
 await page.locator('[data-action="move-program"]').nth(1).click();
 await page.waitForFunction(()=>host.config.programs[0].name==='Evening');
 async function compareKit(theme,width){
  await page.mouse.move(0,0);
  await page.evaluate(async({theme})=>{
   const dark=theme==='dark';
   for(const [name,value] of Object.entries({'--ha-card-background':dark?'#202020':'#ffffff','--primary-text-color':dark?'#eeeeee':'#212121','--secondary-text-color':dark?'#bbbbbb':'#727272','--divider-color':dark?'#555555':'#e0e0e0'}))document.documentElement.style.setProperty(name,value);
   const kit=await import('/custom_components/light_manager/frontend/family-ui/1.5.0/family-ui.js');
   const card=document.querySelector('light-manager-card');
   if(card.shadowRoot.querySelector('style').textContent!==kit.UI_CSS+'\n')throw Error('Local stylesheet override detected');
   document.querySelector('#kit-reference')?.remove();
   const ref=document.createElement('div');ref.id='kit-reference';ref.style.cssText='position:absolute;left:-10000px;top:0;width:'+card.clientWidth+'px';document.body.append(ref);
   const root=ref.attachShadow({mode:'open'});
   const programs=card.config.programs.filter(p=>!p.once_date);
   const groups=[['time','Zeitprogramme',programs.filter(p=>p.kind==='time')],['sensor','Sensorprogramme',programs.filter(p=>p.kind!=='time')]];
   root.innerHTML='<style>'+kit.UI_CSS+'</style><ha-card><main>'+groups.map(([key,title,items])=>kit.programGroup({id:'lm-program-group-'+key,title,count:items.length,expanded:!card.collapsedProgramGroups.has(key),content:items.map((p,index)=>kit.programRow({id:p.id,title:p.name,meta:[p.days.slice().sort((a,b)=>a-b).map(d=>['Mo','Di','Mi','Do','Fr','Sa','So'][d]).join(' · '),...(p.kind==='time'?[]:[p.start+'–'+p.end])],enabled:p.enabled,expanded:card.expanded.has(p.id),index,count:items.length,content:p.actions.map(a=>kit.actionRow({title:a.name?.trim()||card.targetNames(a),description:card.when(a,p.kind),detail:card.actionText(a),enabled:a.enabled,actions:kit.toggle({label:'Aktion '+card.targetNames(a)+' aktivieren',checked:a.enabled,action:'legacy-toggle',iconOnly:true})})).join('')})).join('')})).join('')+'</main></ha-card>';
  },{theme});
  const mismatch=await page.evaluate(()=>{
   const actual=document.querySelector('light-manager-card').shadowRoot,expected=document.querySelector('#kit-reference').shadowRoot;
   const selectors=['.program-group','.program-group-head','.program-group-head strong','.program-group-head>span:last-child','.program','.program-head','.program-title','.program-title>span','.tags','.tags>span','.program-head>.toolbar','.program-order button','.program-head .toggle','.switch-track','.switch-thumb','.program-head .edit-button','.ride','.ride-info','.ride-info strong','.ride-info>span','.ride-info small','.ride-actions'];
   const props=['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','color','backgroundColor','padding','margin','gap','borderWidth','borderRadius','display','gridTemplateColumns','flexWrap','opacity'];
   const failures=[];
   for(const selector of selectors){const aa=[...actual.querySelectorAll(selector)],bb=[...expected.querySelectorAll(selector)];if(aa.length!==bb.length)failures.push(selector+': count');
    aa.forEach((a,i)=>{const b=bb[i];if(!b)return;const sa=getComputedStyle(a),sb=getComputedStyle(b);for(const p of props)if(sa[p]!==sb[p])failures.push(selector+': '+p+' '+sa[p]+' != '+sb[p]);
     if(a.getClientRects().length&&b.getClientRects().length){const ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect();for(const p of ['width','height'])if(Math.abs(ra[p]-rb[p])>.6)failures.push(selector+': '+p+' '+ra[p]+' != '+rb[p]);}
    });
   }return failures;
  });
  const expanded=await page.locator('.program-title').first().getAttribute('aria-expanded');
  await page.screenshot({path:path.join(root,'test-results/kit-qa-'+theme+'-'+width+'-'+expanded+'.png'),fullPage:true});
  assert.deepEqual(mismatch,[],theme+' '+width+' must match unmodified UI Kit');
  await page.evaluate(()=>document.querySelector('#kit-reference').remove());
 }
 await page.locator('[data-action="copy-program"]').first().click();
 assert.equal(await page.locator('[data-path="enabled"]').isChecked(),false);
 assert.ok((await page.locator('[data-path="name"]').inputValue()).includes('Kopie'));
 await page.keyboard.press('Escape');
 assert.equal(await page.evaluate(()=>host.config.programs.length),3);
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
  await page.screenshot({path:path.join(root,'test-results/kit-qa-settings-'+width+'.png'),fullPage:true});
  for(const dark of [false,true]){
   await page.evaluate(dark=>{for(const [key,value] of Object.entries({'--ha-card-background':dark?'#202020':'#ffffff','--primary-text-color':dark?'#eeeeee':'#212121','--secondary-text-color':dark?'#bbbbbb':'#727272','--divider-color':dark?'#555555':'#e0e0e0'}))document.documentElement.style.setProperty(key,value);},dark);
   await page.screenshot({path:path.join(root,'test-results/kit-qa-settings-'+width+'-'+(dark?'dark':'light')+'.png'),fullPage:true});
   await page.locator('[data-op="select-lamps"]').click();
   assert.equal(await page.locator('dialog').evaluate(e=>e.scrollWidth>e.clientWidth),false);
   await page.screenshot({path:path.join(root,'test-results/kit-qa-picker-'+width+'-'+(dark?'dark':'light')+'.png'),fullPage:true});
   await page.keyboard.press('Escape');
  }

  await nav('programs').click();
  const controls=page.locator('.program-head').first().locator(':scope > .toolbar');
  assert.equal(await page.evaluate(()=>{const c=document.querySelector('light-manager-card');return c.shadowRoot.querySelector('ha-card').scrollWidth>c.clientWidth;}),false);
  if(width<600)assert.ok(await page.locator('.program-title').first().evaluate(e=>e.getBoundingClientRect().width)>150);
  if(width<600){assert.equal(await controls.locator('[data-action="copy-program"]').isVisible(),false);assert.equal(await controls.locator('.program-order').isVisible(),false);}
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
  for(const theme of ['light','dark']){
   await compareKit(theme,width);
   await page.locator('.program-title').first().click();
   assert.equal(await page.locator('.ride').first().isVisible(),true);
   await page.evaluate(()=>document.querySelector('light-manager-card').render());
   assert.equal(await page.locator('.program-title').first().getAttribute('aria-expanded'),'true');
   await compareKit(theme,width);
   await page.locator('.program-title').first().click();
  }
  await page.evaluate(()=>{document.documentElement.style.setProperty('--ha-card-background','#ffffff');document.documentElement.style.setProperty('--primary-text-color','#212121');document.documentElement.style.setProperty('--secondary-text-color','#727272');});
  const edit=page.locator('[data-action="edit-program"]').first();
  await edit.click();
  assert.equal(await page.locator('dialog').evaluate(e=>e.open),true);
  await page.locator('[data-path="name"]').fill('Evening edited '+width);
  await page.evaluate(()=>document.querySelector('light-manager-card').refresh());
  assert.equal(await page.locator('[data-path="name"]').inputValue(),'Evening edited '+width);
  assert.equal(await page.locator('[data-path="name"]').evaluate(e=>e.getRootNode().activeElement===e),true);
  assert.equal(await page.locator('#lm-choices-days input:checked').count(),7);
  await page.locator('[data-lm-editor-action]').first().click();
  assert.equal(await page.locator('#lm-brightness-0').count(),1);
  await page.locator('#lm-brightness-0').evaluate(e=>{e.value='54';e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));});
  assert.equal(await page.evaluate(()=>document.querySelector('light-manager-card').editor.value.actions[0].brightness),54);
  await page.locator('#lm-brightness-0-control [data-ui-keep]').click();
  assert.equal(await page.evaluate(()=>document.querySelector('light-manager-card').editor.value.actions[0].brightness),null);
  await page.locator('#lm-brightness-0-control [data-ui-keep]').click();
  await page.locator('[data-colormode="0"]').selectOption('white');
  await page.locator('#lm-white-0').scrollIntoViewIfNeeded();
  await page.screenshot({path:path.join(root,'test-results/kit-qa-white-'+width+'.png'),fullPage:true});
  await page.locator('#lm-white-0').evaluate(e=>{e.value='0';e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));});
  assert.equal(await page.evaluate(()=>document.querySelector('light-manager-card').editor.value.actions[0].kelvin),6500);
  await page.locator('[data-colormode="0"]').selectOption('color');
  await page.locator('#lm-colour-0 .colour-wheel').focus();await page.keyboard.press('Home');
  assert.deepEqual(await page.evaluate(()=>document.querySelector('light-manager-card').editor.value.actions[0].rgb),[255,255,255]);
  await page.evaluate(()=>{const i=host.catalog.findIndex(x=>x.entity==='scene.flur_new');if(i>=0)host.catalog.splice(i,1);host.catalog.push({entity:'scene.flur_new',name:'New scene',state:'scening',attributes:{}});});
  await page.evaluate(()=>document.querySelector('light-manager-card').refresh());
  assert.equal(await page.locator('[data-colormode="0"] option[value="scene.flur_new"]').count(),1);
  await page.locator('[data-colormode="0"]').selectOption('scene.flur_new');
  assert.equal(await page.evaluate(()=>document.querySelector('light-manager-card').editor.value.actions[0].mode),'scene');
  await page.locator('[data-colormode="0"]').selectOption('last');
  await page.locator('#lm-season [data-season-enabled]').check();
  await page.locator('#lm-season-start').fill('01.11.');
  await page.locator('#lm-season-end').fill('30.11.');
  await page.locator('[data-lm-target]').first().click();
  await page.locator('[data-array="targets"][value="l"]').uncheck();
  assert.deepEqual(await page.evaluate(()=>document.querySelector('light-manager-card').editor.value.actions[0].targets),[]);
  await page.locator('[data-array="targets"][value="l"]').check();
  assert.deepEqual(await page.evaluate(()=>document.querySelector('light-manager-card').editor.value.actions[0].targets),['l']);


  await page.screenshot({path:path.join(root,'test-results/kit-qa-dialog-'+width+'.png'),fullPage:true});
  assert.equal(await page.locator('dialog').evaluate(e=>e.scrollWidth>e.clientWidth),false);
  await page.locator('[data-path="name"]').focus();
  await page.keyboard.press('Shift+Tab');
  assert.equal(await page.evaluate(()=>document.querySelector('light-manager-card').shadowRoot.activeElement.closest('dialog')!==null),true);
  await page.locator('[data-op="commit"]').click();
  await page.locator('dialog').waitFor({state:'detached'});
  assert.equal(await page.evaluate(()=>host.config.programs[0].name),'Evening edited '+width);
  assert.equal(await page.evaluate(()=>host.config.programs[0].season_from),'11-01');
  assert.equal(await page.evaluate(()=>host.config.programs[0].season_to),'11-30');
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
 await page.locator('[data-action="edit-program"]').last().click();
 await page.locator('[data-lm-editor-action]').first().click();
 assert.equal(await page.locator('[data-array="actions.0.sensors"]').count(),1);
 await page.locator('#lm-window-start').fill('22:00');await page.locator('#lm-window-end').fill('06:00');
 await page.locator('[data-path="name"]').fill('Motion retained after failure');
 await page.evaluate(()=>host.failSave=true);
 await page.locator('[data-op="commit"]').click();
 await page.getByRole('alert').filter({hasText:'Save denied'}).waitFor();
 assert.equal(await page.locator('[data-path="name"]').inputValue(),'Motion retained after failure');
 assert.equal(await page.locator('dialog').evaluate(e=>e.open),true);
 await page.evaluate(()=>host.failSave=false);
 await page.locator('[data-op="commit"]').click();
 await page.locator('dialog').waitFor({state:'detached'});
 await nav('settings').click();
 const backup=JSON.stringify({product:'Light Manager',version,config:await page.evaluate(()=>host.config)});
 let revision=await page.evaluate(()=>host.revision);
 await page.locator('#lm-backup input[type=file]').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(backup)});
 await page.locator('#lm-confirm').waitFor();
 await page.locator('#lm-confirm [data-ui-cancel-action]').click();
 assert.equal(await page.evaluate(()=>host.revision),revision);
 await page.locator('#lm-backup input[type=file]').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(backup)});
 await page.locator('#lm-confirm [data-action="lm-confirm-yes"]').click();
 await page.waitForFunction(r=>host.revision===r+1,revision);
 const download=page.waitForEvent('download');await page.locator('[data-action="lm-export"]').click();
 assert.match((await download).suggestedFilename(),/^Light-Manager-Sicherung-/);
 await page.locator('[data-op="select-lamps"]').click();
 await page.locator('#lm-entity-selection-search').fill('Hall');
 assert.equal(await page.locator('[data-selection-row]:visible').count(),1);
 await page.locator('[data-selection-row] input[value="light.flur"]').uncheck();
 assert.deepEqual(await page.evaluate(()=>document.querySelector('light-manager-card').editor.value.entities),[]);
 await page.locator('[data-selection-row] input[value="light.flur"]').check();
 await page.keyboard.press('Escape');
 assert.equal(await page.evaluate(()=>host.config.lamps.length),1);
 await nav('time').click();await page.locator('[data-op="once"]').click();
 assert.equal(await page.locator('#lm-once-date').isDisabled(),true);
 await page.keyboard.press('Escape');
 await nav('settings').click();assert.equal(await page.locator('[data-vacation]').count(),1);await page.locator('[data-action="lm-language"][data-language="en"]').click();
 assert.ok((await page.locator('.version-info').innerText()).includes('UI 1.5.0'));
 await section('sensors').click();
 await page.locator('[data-op="edit"][data-section="sensors"]').first().click();
 await page.locator('[data-path="name"]').fill('Door renamed');
 await page.locator('[data-op="commit"]').click();
 await page.locator('dialog').waitFor({state:'detached'});
 assert.equal(await page.evaluate(()=>host.config.sensors[0].name),'Door renamed');
 await page.evaluate(()=>{document.documentElement.style.setProperty('--ha-card-background','#202020');document.documentElement.style.setProperty('--primary-text-color','#eeeeee');document.documentElement.style.setProperty('--secondary-text-color','#bbbbbb');});
 assert.equal(await page.locator('ha-card').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(32, 32, 32)');
 await page.screenshot({path:path.join(root,'test-results/kit-qa-dark.png'),fullPage:true});

 // Optional alarm actions join the daily schedule without any write controls.
 const configBefore=await page.evaluate(()=>JSON.stringify(host.config));
 const savesBefore=await page.evaluate(()=>host.calls.filter(c=>c.type==='light_manager/save').length);
 await page.evaluate(()=>{
  Date.now=()=>Date.parse('2026-11-13T05:00:00Z');host.today='2026-11-13';
  host.planned=[{program:'Evening',action:'on',due:'2026-11-13T05:20:00Z',skipped:false}];
  host.alarmSchedule={incomplete:false,items:[
   {id:'wake/sunrise/light.child',name:'Maximilian',day_type:'Schultag',entity:'light.child',target_name:'Kinderzimmer',phase:'sunrise',minutes:15,due:'2026-11-13T05:10:00Z',action:{mode:'on',brightness:65,kelvin:2700}},
   {id:'wake/wake/light.child',name:'Maximilian',day_type:'Schultag',entity:'light.child',target_name:'Kinderzimmer',phase:'wake',minutes:0,due:'2026-11-13T05:30:00Z',action:{mode:'on',brightness:65,kelvin:2700}},
   {id:'past',name:'Past alarm',day_type:'Schultag',entity:'light.child',target_name:'Kinderzimmer',phase:'wake',due:'2026-11-13T04:59:00Z',action:{mode:'on'}}
  ]};
 });
 await nav('time').click();await page.evaluate(()=>document.querySelector('light-manager-card').refresh());
 await page.locator('[data-alarm-action]').first().waitFor();
 assert.equal(await page.locator('[data-alarm-action]').count(),2);
 assert.equal(await page.locator('[data-alarm-action] button,[data-alarm-action] input').count(),0);
 assert.equal(await page.locator('[data-alarm-action] [role=img] svg').first().getAttribute('data-icon'),'media-alarm');
 assert.equal(await page.locator('[data-alarm-action] [role=img]').first().innerText(),'');
 assert.equal(await page.locator('[data-alarm-action] [role=img] svg').first().evaluate(async e=>{const kit=await import('/custom_components/light_manager/frontend/family-ui/1.5.0/family-ui.js');const t=document.createElement('template');t.innerHTML=kit.icon('media-alarm');return e.isEqualNode(t.content.firstElementChild);}),true);
 assert.equal(await page.locator('[data-alarm-action] [role=img]').first().getAttribute('aria-label'),'Alarm');
 const titles=await page.locator('#lm-schedule .ride-info strong').allTextContents();
 assert.ok(titles[0].startsWith('Fri 06:10'));assert.ok(titles[1].startsWith('Fri 06:20'));assert.ok(titles[2].startsWith('Fri 06:30'));
 assert.equal(await page.locator('[data-op="skip"]').count(),1);
 for(const width of [1100,390,320])for(const dark of [false,true]){
  await page.setViewportSize({width,height:1000});
  await page.evaluate(dark=>{for(const [key,value] of Object.entries({'--ha-card-background':dark?'#202020':'#ffffff','--primary-text-color':dark?'#eeeeee':'#212121','--secondary-text-color':dark?'#bbbbbb':'#727272','--divider-color':dark?'#555555':'#e0e0e0'}))document.documentElement.style.setProperty(key,value);},dark);
  assert.equal(await page.evaluate(()=>{const c=document.querySelector('light-manager-card');return c.shadowRoot.querySelector('ha-card').scrollWidth>c.clientWidth}),false);
  const marker=page.locator('[data-alarm-action] [role=img]').first();
  assert.equal(await marker.locator('svg').evaluate(e=>getComputedStyle(e).width),'16px');
  assert.equal(await marker.locator('svg').evaluate(e=>getComputedStyle(e).height),'16px');
  await page.screenshot({path:path.join(root,'test-results/kit-qa-alarm-'+width+'-'+(dark?'dark':'light')+'.png'),fullPage:true});
 }
 assert.equal(await page.evaluate(()=>JSON.stringify(host.config)),configBefore);
 assert.equal(await page.evaluate(()=>host.calls.filter(c=>c.type==='light_manager/save').length),savesBefore);
 assert.equal(await page.evaluate(()=>host.calls.filter(c=>c.type==='light_manager/get').at(-1).include_alarms),true);
 await page.evaluate(()=>{host.alarmSchedule={items:[],incomplete:true};return document.querySelector('light-manager-card').refresh();});
 assert.equal(await page.locator('[data-alarm-action]').count(),0);
 assert.equal(await page.locator('[data-op="skip"]').count(),1);
 assert.ok((await page.locator('main').innerText()).includes('Some alarm switching times could not be loaded.'));
 await page.evaluate(()=>{host.alarmSchedule={items:[],incomplete:false};return document.querySelector('light-manager-card').refresh();});

 // Rolling window crosses midnight; wall-clock labels must not drive sorting.
 await page.evaluate(()=>{
  Date.now=()=>Date.parse('2026-11-13T22:00:00Z');
  host.planned=[
   {program:'Evening',action:'on',date:'2026-11-14',due:'2026-11-14T18:00:00Z',skipped:false},
   {program:'Evening',action:'on',date:'2026-11-13',due:'2026-11-13T22:30:00Z',skipped:false},
   {program:'Evening',action:'off',date:'2026-11-14',due:'2026-11-14T22:00:00Z',skipped:false},
   {program:'Evening',action:'off',date:'2026-11-13',due:'2026-11-13T21:59:00Z',skipped:false}
  ];
  host.alarmSchedule={incomplete:false,items:[
   {id:'tomorrow',name:'Maximilian',day_type:'Schultag',entity:'light.child',target_name:'Kinderzimmer',phase:'wake',due:'2026-11-13T23:15:00Z',action:{mode:'on',brightness:65}},
   {id:'outside',name:'Outside',day_type:'Schultag',entity:'light.child',phase:'wake',due:'2026-11-14T22:01:00Z',action:{mode:'on'}}
  ]};
  return document.querySelector('light-manager-card').refresh();
 });
 assert.equal(await page.locator('#lm-schedule .ride').count(),3);
 let windowTitles=await page.locator('#lm-schedule .ride-info strong').allTextContents();
 assert.ok(windowTitles[0].startsWith('Fri 23:30'));assert.ok(windowTitles[1].startsWith('Sat 00:15'));assert.ok(windowTitles[2].startsWith('Sat 19:00'));
 assert.deepEqual(await page.evaluate(()=>{const c=document.querySelector('light-manager-card'),lang=c.language;c.language=()=> 'de';const values=['2026-11-13T22:30:00Z','2026-11-13T23:15:00Z'].map(d=>c.scheduleTime(d));c.language=lang;return values;}),['Fr 23:30','Sa 00:15']);
 assert.equal(await page.locator('#lm-schedule [data-ui="collapse"]').count(),0);
 assert.equal(await page.locator('main').evaluate(e=>e.innerText.includes('Friday')),false);
 await page.evaluate(()=>{host.config.programs.find(p=>p.id==='Evening').actions.find(a=>a.id==='on').skips=['2026-11-13'];return document.querySelector('light-manager-card').refresh();});
 const tomorrowSkip=page.locator('[data-op="skip"][data-date="2026-11-14"]');
 await tomorrowSkip.click();
 assert.equal(await tomorrowSkip.innerText(),'');
 assert.equal(await tomorrowSkip.getAttribute('aria-pressed'),'true');
 assert.deepEqual(await page.evaluate(()=>host.config.programs.find(p=>p.id==='Evening').actions.find(a=>a.id==='on').skips),['2026-11-13','2026-11-14']);
 await tomorrowSkip.click();
 assert.deepEqual(await page.evaluate(()=>host.config.programs.find(p=>p.id==='Evening').actions.find(a=>a.id==='on').skips),['2026-11-13']);
 // Shared compact controls and persistent once-only move, with failed-save recovery.
 assert.equal(await tomorrowSkip.innerText(),'');
 assert.equal(await tomorrowSkip.getAttribute('aria-label'),'Skip');
 assert.equal(await tomorrowSkip.getAttribute('title'),'Skip');
 assert.equal(await tomorrowSkip.getAttribute('aria-pressed'),'false');
 assert.equal(await page.locator('[data-op="skip"]').first().locator('svg[data-icon="skip-once"]').count(),1);
 assert.equal(await page.locator('[data-op="reschedule"]').first().locator('svg[data-icon="reschedule"]').count(),1);
 assert.equal(await page.locator('[data-alarm-action] [data-op="reschedule"]').count(),0);
 const tomorrowMove=page.locator('[data-op="reschedule"][data-date="2026-11-14"]');
 await tomorrowMove.click();
 await page.locator('#lm-reschedule-time').fill('18:30');
 await page.locator('[data-action="lm-move-cancel"]').click();
 assert.equal(await page.locator('#lm-reschedule').count(),0);
 assert.equal(await page.evaluate(()=>host.config.programs.find(p=>p.id==='Evening').actions.find(a=>a.id==='on').reschedules),undefined);
 await tomorrowMove.click();await page.locator('#lm-reschedule-time').fill('18:30');
 await page.evaluate(()=>host.failSave=true);await page.locator('[data-action="lm-move-save"]').click();
 assert.ok((await page.locator('#lm-reschedule-error').innerText()).includes('Save denied'));
 assert.equal(await page.locator('#lm-reschedule-time').inputValue(),'18:30');
 await page.evaluate(()=>host.failSave=false);await page.locator('[data-action="lm-move-save"]').click();
 await page.locator('#lm-reschedule').waitFor({state:'detached'});
 assert.equal(await page.evaluate(()=>host.config.programs.find(p=>p.id==='Evening').actions.find(a=>a.id==='on').reschedules['2026-11-14']),'18:30');
 assert.ok((await page.locator('#lm-schedule .ride-info strong').allTextContents())[2].startsWith('Sat 18:30'));
 await page.locator('[data-op="reschedule"][data-date="2026-11-13"]').click();
 await page.locator('#lm-reschedule-time').fill('22:00');
 await page.locator('[data-action="lm-move-save"]').click();
 assert.ok((await page.locator('#lm-reschedule-error').innerText()).includes('future time'));
 await page.keyboard.press('Escape');await page.locator('#lm-reschedule').waitFor({state:'detached'});
 for(const width of [1100,390,320])for(const dark of [false,true]){
  await page.setViewportSize({width,height:1000});
  await page.evaluate(dark=>{document.documentElement.style.setProperty('--ha-card-background',dark?'#202020':'#fff');document.documentElement.style.setProperty('--primary-text-color',dark?'#eee':'#212121');document.documentElement.style.setProperty('--secondary-text-color',dark?'#bbb':'#727272');document.documentElement.style.setProperty('--divider-color',dark?'#555':'#e0e0e0');},dark);
  assert.equal(await page.evaluate(()=>{const c=document.querySelector('light-manager-card');return c.shadowRoot.querySelector('ha-card').scrollWidth>c.clientWidth}),false);
  await page.screenshot({path:path.join(root,'test-results/kit-qa-24h-'+width+'-'+(dark?'dark':'light')+'.png'),fullPage:true});
  await tomorrowMove.click();
  assert.equal(await page.locator('#lm-reschedule').evaluate(e=>e.scrollWidth>e.clientWidth),false);
  await page.screenshot({path:path.join(root,'test-results/kit-qa-reschedule-'+width+'-'+(dark?'dark':'light')+'.png'),fullPage:true});
  await page.keyboard.press('Escape');await page.locator('#lm-reschedule').waitFor({state:'detached'});
 }
 await nav('programs').click();await page.evaluate(()=>document.querySelector('light-manager-card').refresh());
 assert.equal(await page.evaluate(()=>host.calls.filter(c=>c.type==='light_manager/get').at(-1).include_alarms),false);
 await nav('help').click();
 assert.ok((await page.locator('.howto').innerText()).includes('HA UI Kit 1.5.0'));
 assert.deepEqual(errors,[]);
 console.log('UI Kit migration passed: desktop/mobile, DE/EN, themes, settings folds, names, group counts and folds, program editing, native dialog and Escape.');
 await browser.close();server.close();
})().catch(e=>{console.error(e);server.close();process.exit(1)});
