import './config/youtube.js';

var searchYouTube = (options, callback) => {
  var query = options.query;
  var max = options.max || 5;
  var key = options.key;
  
  $.ajax({
    cache: false,
    data: $.extend({
      key: YOUTUBE_API_KEY,
      q: query,
      part: 'snippet'
    }, { maxResults: max,
      dataType: 'json',
      type: 'GET',
      timeout: 5000,
      url: 'https://www.googleapis.com/youtube/v3/search'
    })
  });
};

export default searchYouTube;
