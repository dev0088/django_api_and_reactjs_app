import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import gridImage from '../../../images/grid.jpg';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
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
    img: gridImage,
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    img: gridImage,
    title: 'Hats',
    author: 'Hans',
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
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
const GridListSimple = () => (
  <div style={styles.root}>
    <GridList
      cellHeight={180}
      style={styles.gridList}
    >
      <Subheader>December</Subheader>
      {tilesData.map((tile, index) => (
        <GridTile
          key={index}
          title={tile.title}
          subtitle={<span>by <b>{tile.author}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src={tile.img} alt=""/>
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default GridListSimple;
