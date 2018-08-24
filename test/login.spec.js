import 'mocha';
import { expect } from 'chai';

describe('login', () => {
  /* tslint:disable-next-line:no-var-requires */
  const indexExport = require('./public/assets/js/login.js')({ projectId: 'final-project-common-core' }, 'admin.credential.cert');
  after(() => {
    // Call cleanup (handles case of cleanup function not existing)
    indexExport.cleanup && indexExport.cleanup();
  });

  it('should export the expected functions and namespaces', () => {
    expect(Object.getOwnPropertyNames(indexExport).sort()).to.deep.equal([
      'analytics',
      'auth',
      'cleanup',
      'crashlytics',
      'database',
      'firestore',
      'makeChange',
      'mockConfig',
      'pubsub',
      'storage',
      'wrap',
    ]);
  });

  it('should set env variables based parameters SDK was initialized with', () => {
    expect(process.env.FIREBASE_CONFIG).to.equal(JSON.stringify({ projectId: 'final-project-common-core' }));
    expect(process.env.GOOGLE_APPLICATION_CREDENTIALS).to.equal('admin.credential.cert');
  });

  it('should clean up env variables once cleanup is called', () => {
    indexExport.cleanup();
    expect(process.env.FIREBASE_CONFIG).to.equal(undefined);
    expect(process.env.GOOGLE_APPLICATION_CREDENTIALS).to.equal(undefined);
  });
});

import './lifecycle.spec';
import './main.spec';
import './app.spec';
// import './providers/analytics.spec';
// import './providers/auth.spec';
// import './providers/database.spec';
// import './providers/firestore.spec';
// import './providers/https.spec';
// import './providers/pubsub.spec';
// import './providers/storage.spec';
// import './providers/crashlytics.spec';





// const assert = require("assert");
// const login = require('./public/assets/js/login.js');

// describe('registerWithFirebase', () => {

//     it('deberia ser un correo electronico', () => {
//       assert.equal(typeof string, 'email');
//     });
//     it('deberia ser una password', () => {
//         assert.equal(typeof string, 'password');
//       });
//     });