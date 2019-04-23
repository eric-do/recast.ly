import YOUTUBE_API_KEY from '../config/youtube.js';

var searchYouTube = (options, callback) => {
  var query = options.query || 'test';
  var max = options.max || 5;
  var key = options.key || YOUTUBE_API_KEY;
  
  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/search`,
    cache: false,
    type: 'GET',
    dataType: 'json',
    timeout: 5000,
    success: function(data) {
      callback(data.items);
    },
    error: function() { console.log('Fail'); },
    data: {
      key: key,
      q: query,
      part: 'snippet',
      maxResults: max,
      videoEmbeddable: true,
      fields: 'items',
      type: 'video'
    }
  });
};

export default searchYouTube;