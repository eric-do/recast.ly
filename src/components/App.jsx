import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import exampleVideoData from '../data/exampleVideoData.js';
import searchYouTube from '../lib/searchYouTube.js';
import Search from './Search.js';

class App extends React.Component {
  constructor(props) {
    // Input: props
    // Return: nothing
    // First we need to pass props to the super constructor
    // (To change later): then we assign the class's searchYouTube function based on how it's called
    //   - The test cases pass it as a prop
    //   - But the test cases also require us not to pass anything to App from index.js, otherwise the prehook is broken
    // Then we set App state to the video list and current video on display
    // If change is made either to the list or the display, the App's state will be reset, causing App component and children to rerender
    super(props);
    this.searchYouTube = props.searchYouTube || searchYouTube;
    this.state = {
      videos: exampleVideoData,
      currentVideo: exampleVideoData[0]
    };
  }

  componentDidMount() {
    // Objective
    //  Once the App component has mounted, statements in componentDidMount will be executed
    //  Since we shouldn't make async calls in the constructor, we should do so here
    //  Async calls - pulling search results then updating state (search takes time)
    // Input: nothing
    // Return: nothing
    // Call searchYouTube, passing in an object TBD, and a callback funtion to set state
    this.searchYouTube({}, data => {
      this.setState({
        videos: data
      });
    });
  }
  
  onClickHandler(video) {
    // Input: video object respective to the video title that is clicked in video list
    // Return: nothing
    // Objective
    //  We need a way to detect when the video title in the video list is clicked
    //  The click handler is called when the title is clicked, and sets state of currentVideo to the clicked video
    //  It does this by being passed down as a prop all the way down to the video entry component
    //  Since the video entry component has access to this function as a prop, it can call the function, passing back the video
    console.log('hi');
    this.setState({
      currentVideo: video
    });
  }

  onTypeHandler(event) {
    // Input: an event object hopefully containing the current search term
    // Whenever the user types a letter into the input field, then we should initiate a searchYouTube call
    // HOWEVER, we should only initiate the youtube call at most once every .5 seconds (500 ms)
    // We should use the underscore _.debounce(function, wait) method to control the frequency of our call
    // Whenever we make a call to searchYouTube, we will pass it two params
    //  Object containing the current query
    //  Function callback to update state
    console.log(event.target.value + event.key);
    this.searchYouTube({query: event.target.value + event.key}, _.debounce(data => {
      this.setState({
        videos: data
      });
    }, 500));
  }
  
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search onKeyPress={this.onTypeHandler.bind(this)}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.currentVideo}/>
          </div>
          <div className="col-md-5">
            <VideoList onClick={this.onClickHandler.bind(this)} videos={this.state.videos} />
          </div>
        </div>
      </div> 
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;