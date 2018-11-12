import React from 'react';
import SortableTbl from 'react-sort-search-table';
import ReactPlayer from 'react-player';
import moment from 'moment';
import './videoInterviewView.css';

const col = [
      "videoUrl",
      "position_type",
      "question",
      "updated",
      "size",
    ];

const tHead = [
      "Video",
      "Position Type",
      "Question",
      "Created At",
      "Size",
    ];

const BaseProductTblVideoComponent = (props) =>
{
  return (
    <td style={{width: '500px', backgroundColor: '#fff'}} >
      <ReactPlayer
        playing={false}
        url={props.rowData.videoUrl}
        className='react-player'
        width={'100%'}
        controls={true}
      />
    </td>
  );
};


class VideoTableView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'desc',
      orderBy: 'updated',
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 5,
    };
  }

  converUrlToData(videoUrls) {
    let data = []
    if (videoUrls){
      Object.keys(videoUrls).map((key) => {
        let videoUrl = videoUrls[key]
        data.push({
          "_id": videoUrl.id,
          "videoUrl": videoUrl.url,
          "position_type": videoUrl.position_type ? videoUrl.position_type : 'None',
          "question": videoUrl.question ? videoUrl.question : 'None',
          "updated": moment(videoUrl.updated).format('DD-MM-YYYY HH:mm'),
          "size": videoUrl.size
        })
      })
    }
    return data
  }

  componentWillMount() {
    this.setState({
      data: this.converUrlToData(this.props.videoUrls)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: this.converUrlToData(nextProps.videoUrls)
    })
  }

  render () {
    const {data} = this.state
    return (
      <SortableTbl tblData={data}
        tHead={tHead}
        customTd={[
          {custd: BaseProductTblVideoComponent, keyItem: "videoUrl"},
        ]}
        dKey={col}
      />
    );
  }
};


export default VideoTableView;