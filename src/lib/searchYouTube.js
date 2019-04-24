import YOUTUBE_API_KEY from '../config/youtube.js';

var searchYouTube = ({ query = 'test', max = 5, key = YOUTUBE_API_KEY }, callback) => {
  // Input: an options object containing parameters for the YouTube API search (query, max, key)
  // This function makes an ajax call to the Google API, and receives a JSON object
  // Since this project requires the object match data structure with the example data structure, 
  // this function also needs to convert the JSON object into an array by accessing the specfic property
  // in the object where the video array is located (data.items)
  // Upon successful pulling of the data, this function will fire the callback function (success callback)
  // The success callback should call this.setState, so that App will rerender with the new data
  
  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/search`,
    cache: false,
    type: 'GET',
    dataType: 'json',
    timeout: 5000,
    success: data => callback(data.items),
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