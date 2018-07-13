import React, {Component} from 'react';
import {connect} from 'react-redux';
import imageUrl from '../../images/banner.jpg';

const style = {
  backgroundImage: 'url('+ imageUrl + ')',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
}

class Blog extends Component {
  blogLoop () {
    return this.props.blogs.map((blog) => {
      return (
        <div className="col-md-4" key={blog.id}>
          <a href="">
            <div className="blog-single">
              <img src={blog.img} alt="" />
              <div className="details">
                <h5>{blog.title}</h5>
                <p>{blog.category}</p>
              </div>
            </div>
          </a>
        </div>
      )

    });
  }
  render() {
    return (
      <div>
        <div className="re-page-banner" style={style}>
          <div className="overlay"></div>
          <h1>Blog</h1>
        </div>
        <div className="row">
          {this.blogLoop()}
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps)(Blog);
