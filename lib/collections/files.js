myFiles = new Meteor.Files({
  storagePath: 'public/.uploads/',
  collectionName: 'myFiles',
  chunkSize: 256*128,
  permissions: 0o777,
  allowClientCode: true
 });

