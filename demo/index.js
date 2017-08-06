import { parseURL } from 'utils/data-service';
import OppositeViz from 'opposite-viz/opposite-viz';
import RadialViz from 'radial-viz/radial-viz';

const urlWSDiff = './data/wsdiff.json';
const urlThes = './data/thes_system.json';
const urlThesClust = './data/thes_system_clust.json';
const urlSketch = './data/wsketch_system.json';
const urlSketchClust = './data/wsketch_system_clust.json';

const showFirstDiff = {
  viz: {
    divId: 'viz-container-0',
    svgId: 'ske-viz-opposite-0',
    className: 'wsdiff-viz-0',
    animation: false,
    margin: { top: 80, right: 50, bottom: 60, left: 50 }
  },
  category: {
    showItems: [0]
  },
  circle: {
    mouseclick: (d) => {
      console.log('clicked a circle - ', d);
    }
  },
  text: {
    mouseclick: (d) => {
      console.log('clicked a text - ', d);
    }
  },
  tick: {
    number: 5
  }
};

const showAllDiff = {
  viz: {
    divId: 'viz-container-1',
    svgId: 'ske-viz-opposite-1',
    className: 'wswiff-viz-1'
  }
};

function catchError(event) {
  // log the event
  console.log(event);

  // add the warning to the top of the window
  const style = 'position:absolute; width:100%; height:30px; background:#000;'
    + 'opacity:0.5; padding: 30px; color:white; font-size: 16px; text-align: center;';

  // add explanation
  const text = 'visualization could not be created, please check the console';

  // text of the warning
  const warning = `<div style="${style}">${event.type} - ${text}}</div>`;

  document.body.innerHTML += warning;
}

parseURL(urlWSDiff, 'WS_DIFF')
  .then(data => {
    // either show only a selected number
    OppositeViz(data, showFirstDiff);

    // or show all the categories
    OppositeViz(data, showAllDiff);
  })
  .catch(catchError);

parseURL(urlThes, 'THES')
  .then(data => RadialViz(data,
    {
      viz: {
        divId: 'viz-container-2'
      },
      circle: {
        mouseover: (d) => console.log('over', d),
        mouseout: (d) => console.log('out', d),
        mouseclick: (d) => console.log('click', d)
      }
    }
  ))
  .catch(catchError);

parseURL(urlThesClust, 'THES')
  .then(data => RadialViz(data,
    {
      viz: {
        divId: 'viz-container-3',
        margin: { top: 120, right: 120, bottom: 120, left: 120 }
      },
      category: {
        show: true,
        diff: false
      }
    }
  ))
  .catch(catchError);

parseURL(urlSketch, 'SKETCH')
  .then(data => RadialViz(data,
    {
      viz: {
        divId: 'viz-container-4',
        margin: { top: 120, right: 120, bottom: 120, left: 120 }
      },
      tick: {
        color: 'rgb(255, 255, 255)'
      },
      category: {
        show: true,
        diff: false,
        items: [
          { name: 'modifiers of "%w"', show: true, color: 'powderblue' },
          { name: 'nouns and verbs modified by "%w"', show: true, color: 'blanchedalmond' },
          { name: 'verbs with "%w" as object', show: true, color: 'lightsteelblue' },
          { name: '... is a "%w"', show: true, color: 'pink' }
        ]
      }
    }
  ));

parseURL(urlSketchClust, 'SKETCH')
  .then(data => RadialViz(data,
    {
      viz: {
        divId: 'viz-container-5',
        margin: { top: 120, right: 120, bottom: 120, left: 120 }
      },
      tick: {
        color: 'rgb(255, 255, 255)'
      },
      category: {
        show: true,
        diff: false,
        items: [
          { name: 'modifiers of "%w"', show: true, color: 'powderblue' },
          { name: 'nouns and verbs modified by "%w"', show: true, color: 'blanchedalmond' }
        ],
        labelSize: 13,
        labelPadding: 80
      }
    }
  ));
