// /**
//  *  Copyright (c) 2015, Facebook, Inc.
//  *  All rights reserved.
//  *
//  *  This source code is licensed under the BSD-style license found in the
//  *  LICENSE file in the root directory of this source tree. An additional grant
//  *  of patent rights can be found in the PATENTS file in the same directory.
//  */
//
// // Model types
// class User {}
// class Widget {}
//
// // Mock data
// var viewer = new User();
// viewer.id = '1';
// viewer.name = 'Anonymous';
// var widgets = ['What\'s-it', 'Who\'s-it', 'How\'s-it'].map((name, i) => {
//   var widget = new Widget();
//   widget.name = name;
//   widget.id = `${i}`;
//   return widget;
// });
//
// module.exports = {
//   // Export methods that your schema can use to interact with your database
//   getUser: (id) => id === viewer.id ? viewer : null,
//   getViewer: () => viewer,
//   getWidget: (id) => widgets.find(w => w.id === id),
//   getWidgets: () => widgets,
//   User,
//   Widget,
// };
///////------ PODCAST NETWORK ------///////
import Mongoose from 'mongoose';
Mongoose.connect('mongodb://root:password@ds015859.mlab.com:15859/podcast-network', function(err) {
  if (err) {
    console.log(err);
  }
});

const Podcast  = Mongoose.model('Podcast', {
  id: Mongoose.Schema.Types.ObjectId,
  title: String,
  url: String,
  author: String,
  date: String
});

// for(let i = 1; i < 10; i++) {
//   var favoured = new Podcast({
//     title: `Podcast ${i}`,
//     url: `google.com/${i}`,
//     author: 'Ps Satish',
//     date: `${i} March, 2016`
//   });
//
//   favoured.save((err) => {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log(`Podcast ${i} added`);
//     }
//   });
// }

Podcast.find({}, function(err, podcasts) {
  if(err) {
    console.log(err);
  } else {
    console.log(podcasts);
  }
});

export default Podcast;
