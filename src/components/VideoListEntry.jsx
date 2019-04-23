var VideoListEntry = (props) => (
  // Input: props: onClick (onClickHandler), and video object
  // VideoListEntry is the endpoint for App passing down its onClick method and video objects
  // VideoList entry puts the onClick method into its div which contains video title
  // When a user clicks the video title, onClick() is fired, and handled by passing the video object to it
  <div className="video-list-entry media">
    <div className="media-left media-middle">
      <img className="media-object" src={props.video.snippet.thumbnails.default.url} alt="" />
    </div>
    <div className="media-body">
      <div onClick={() => props.onClick(props.video)} className="video-list-entry-title">{props.video.snippet.title}</div>
      <div className="video-list-entry-detail">{props.video.snippet.description}</div>
    </div>
  </div>
);

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoListEntry.propTypes = {
  video: React.PropTypes.object.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default VideoListEntry;
