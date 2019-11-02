import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import './Slider.scss';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        'slide-1',
        'slide-2',
        'slide-3',
        'slide-4',
        'slide-5',
        'slide-6',
      ],
      slider: [], // array with react elements
      width: 0, // window width, if user scrolls - slider should be responsive
      height: 0
    };
    this.timeoutNewPicture = null; // timeout for changing picture - last pic will be first
    this.offsets = {}; // real pictures offset from left, needs for moving images to the right

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.makeSlides();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    if (this.timeoutNewPicture) {
      clearTimeout(this.timeoutNewPicture);
    }
    window.removeEventListener('resize', this.updateWindowDimensions);
  }


  render() {
    const {slider} = this.state;
    return (
      <section className="slider-wrapper">
        <div className="slider-container">
          <div className="images">
            {slider}
          </div>
        </div>
      </section>
    );
  }

  makeSlides() {
    let currentOffset = 0;
    this.setState({
      slider: this.state.images.map(
        (slide, idx) => {
          if (this.offsets[slide] && this.state.width > currentOffset) {
            currentOffset += this.offsets[slide];
          } else if (this.offsets[slide] && this.state.width < currentOffset) {
            currentOffset = idx === 0 ? 0 : (300 + 20 * idx);// 320px seems to be the best offset with absolute position
          } else {
            currentOffset = idx === 0 ? 0 : (idx * 300 + 20 * idx);
          }
          return <CSSTransitionGroup
            transitionName="slide"
            transitionEnterTimeout={2000}
            transitionLeaveTimeout={2000}
            className='image-container'
            key={"slider-wrapper_" + idx}
          >
            <img
              key={slide}
              style={{left: currentOffset + 'px'}}
              src={require(`./assets/photos/${slide}.jpg`)}
              alt=''/>
          </CSSTransitionGroup>
        }
      )
    }, this.changeImage);
  }

  changeImage() {
    // return
    let time = 0;
    if (this.timeoutNewPicture) {
      clearTimeout(this.timeoutNewPicture);
      time = 2000;
    }

    this.timeoutNewPicture = setTimeout(() => {
      this.setState({
        images: (() => {
          let last = this.state.images.pop();
          this.state.images.unshift(last);
          return this.state.images;
        })()
      }, this.makeSlides)
    }, time)
  }

  updateWindowDimensions() {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

}

export default Slider;
