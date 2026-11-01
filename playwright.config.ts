import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir:'./tests', fullyParallel:false, reporter:[['list']],
 use:{baseURL:'http://127.0.0.1:3001',trace:'retain-on-failure',screenshot:'only-on-failure'},
 projects:[
  {name:'desktop',use:{browserName:'chromium',viewport:{width:1440,height:900},deviceScaleFactor:2}},
  {name:'mobile',use:{browserName:'chromium',viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true}},
 ],
 webServer:{command:'npm run start -- --hostname 127.0.0.1',url:'http://127.0.0.1:3001',reuseExistingServer:false,gracefulShutdown:{signal:'SIGTERM',timeout:5000}},
});
