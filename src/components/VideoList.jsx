import VideoListEntry from './VideoListEntry.js';

var VideoList = (props) => (
  // Input: props - onClick, video
  // Return: JSX
  // VideoList takes 2 props:
  //   onClick: a method that it continues to pass to VideoListEntry
  //   video: the video object to pass as prop to VideoListEntry
  // VideoList iterates through an array of videos using Array.prototype.map, and returns
  //  an array of JSX objects with respective videos
  <div className="video-list">
    {
      props.videos.map(video => (
        <VideoListEntry onClick={props.onClick} video={video} />
      ))
    }
  </div>
);

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoList.propTypes = {
  videos: React.PropTypes.array.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
export default VideoList;
