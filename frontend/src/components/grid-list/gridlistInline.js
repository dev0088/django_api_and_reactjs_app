import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import gridImage from '../../images/grid.jpg';
import gridImageLarge from '../../images/grid-large.jpg';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

const tilesData = [
  {
    img: gridImage,
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: gridImage,
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: gridImage,
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: gridImageLarge,
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: gridImage,
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    img: gridImage,
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: gridImage,
    title: 'Vegetables',
    author: 'jill111',
  },
  {
    img: gridImage,
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
];

/**
 * This example demonstrates the horizontal scrollable single-line grid list of images.
 */
const GridListSingleLine = () => (
  <div style={styles.root}>
    <GridList style={styles.gridList} cols={2.2}>
      {tilesData.map((tile, index) => (
        <GridTile
          key={index}
          title={tile.title}
          actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
          titleStyle={styles.titleStyle}
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <img src={tile.img} alt=""/>
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default GridListSingleLine;
