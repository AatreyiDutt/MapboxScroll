mapboxgl.accessToken = 'pk.eyJ1IjoiYWF0cmV5aWR1dHQiLCJhIjoiY2wyNG52cmcxMjF5NzNjcDZob3VkYXpjbiJ9.T5P5CysazB1XMUPjKX9Kiw';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/aatreyidutt/cl2rdcs7f003i14mfihnmswkd',
bearing: 0,
center: [78.0688997, 23.5272803],
zoom: 3.5,
pitch: 0
});

//This is all the stuff that runs on the first load of the map.
map.on('load', () => {
  //Hide all presentation layers
  //This demo uses three specific layers. I want to hide them initially so I can reveal them piece meal.
  map.setLayoutProperty('bangpak', 'visibility', 'visible');
  map.setLayoutProperty('india', 'visibility', 'visible');

//Hide the legend, slider, and infobox on first load. Obviously delete these lines if you want them visible from the start.
//document.getElementById('legend').style.display = 'none';
// document.getElementById('console').style.display = 'visible';
//document.getElementById('infobox').style.display = 'none';

   createLegend()
  //to reduce clutter, the steps for creating a legend, slider, and menu have all been turned into functions.
  // createSlider()
  createMenu()

});

function createMenu(){
  console.log("inside Menu func");

    // MENU For selecting layers
    // Read in all the layers you want to toggle
    var toggleableLayerIds = ['bangpak', 'india'];

    //These are the names for the layers that will appear on the menu
    var layerNames = ['Hindu & Sikh Conflict', 'Muslim Conflict']

    //Loop that generates a menu item for each layer in the above array.
    for (var i = 0; i < toggleableLayerIds.length; i++) {
      var id = toggleableLayerIds[i];
      var name = layerNames[i];
      var link = document.createElement('a');
      link.href = '#';
      link.className = ''; //Menu initially sets every item as inactive.
      link.textContent = name;
      console.log(name);
      link.id = id;

      //create an event handler for each menu item. If clicked check whether the layer is visible, if so set visibility to 'none' and vice versa.
      link.onclick = function(e) {
        var clickedLayer = this.id;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
          map.setLayoutProperty(clickedLayer, 'visibility', 'none');
          this.className = '';

        } else {
          this.className = 'active';
          map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
      };
      var layers = document.getElementById('menu');
      layers.appendChild(link);
    }

}


//This is a lazy function to hide and show menus relative to the layers. It waits for any change in the map rendering and then checks to see what menu items are active and turns on the infobox, slider, and legend. Normally, you would build this logic into the click event handler for each button.

// map.on('idle', () => {
//
//   var toggleableLayerIds = ['religion-by-location', 'author-location-text-title', 'temporality-count'];
//
//   for (var i = 0; i < toggleableLayerIds.length; i++) {
//     var id = toggleableLayerIds[i];
//     var visibility = map.getLayoutProperty(id, 'visibility');
//
//     if (id == 'religion-by-location' && visibility === 'none') {
//       document.getElementById('legend').style.display = 'none';
//     } else if (id == 'religion-by-location' && visibility === 'visible') {
//       document.getElementById('legend').style.display = 'initial';
//     }
//     if (id == 'temporality-count' && visibility === 'none') {
//       document.getElementById('console').style.display = 'none';
//     } else if (id == 'temporality-count' && visibility === 'visible') {
//       document.getElementById('console').style.display = 'initial';
//     }
//     if (id == 'author-location-text-title' && visibility === 'none') {
//       document.getElementById('infobox').style.display = 'none';
//     } else if (id == 'author-location-text-title' && visibility === 'visible') {
//       document.getElementById('infobox').style.display = 'initial';
//     }
//   }
// });

//Event handler for the infobox. This checks where the mouse is when it moves. If it moves over an area where the layer it populates the info box.
map.on('mousemove', function(e) {

  //START INFOBOX CODE =======================================================

  //CONTEXT--------------------------------------------------------
  //The infobox is "triggered" by the mousemove function. That is, when your mouse moves over a certain area the function activates. It then pulls information from the layer in order to display it.  The two things you we will set here are the layer you are pulling information and the information you are going to display.

  //CONTEXT-------------------------------------------------
  // This makes a temporary version of the layer from which we will pull data based on the area the mouse cursor is pointing over (e.point). So if we are hovering over Delhi it will pull up the information on Delhi. In order to be able to do this the computer needs to know where to find this information. In this case, the layer is 'author-location-text-title'. Just so the script grabs the most up to date layer please publish your project. Now go to mapbox figure out what layer you want info for and copy the name exactly and replace 'author-location-text-title'.

  //MAKE CHANGE-----------------------------------------------------------------
  var info = map.queryRenderedFeatures(e.point, {
    layers: ['bangpak'] //REPLACE 'author-location-text-title' with the name of your layer
    //of your layer
  });

  //CONTEXT -----------------------------------------------------------------
  //The code below looks a bit overwhelming! Essentially, what we will be doing is telling the computer what information about what features we want to display. The code below produces the name of the author, the name of the story, the name of the location, and the count. It also adds a picture of the book cover.
  //Since, these values are going to change depending on where I scroll I want to get these pieces of information based on variables and not absolute values. I do this by looking at the Info variable I created earlier. Since, this variable contains all the values of the area my mouse is currently over, I can display whatever values I want. I access these values by saying   info[0].properties.author_name. That is, give me the current value of the author_name column. Whatever attributes are part of the layer can be accessed. So really, the only thing you are changing here is the value after the properties. to match with what you want to show.
  //You'll also notice that there are pieces in double quotes like "Name: ". This is constant and Name: will always show on a scroll over. You'll note that this text is connected with the variable info[0].properties.author_name through a plus sign ( + ). If computers want to add text together they need to concatenate.
  //If I write "Programming " + "is " + "fun.", the output will be Programming is fun. Thus if you want to change the labels of the text before the variable this is what you change.

  //For the images I did a simple workaround. I want to display the image of the text for each author, but I do not necessarily have each the title of each work as some are short stories. Instead, saved a picture of each author's work and saved it by their name (i.e. Sikdar, Sunanda.jpg). Thus, whenever an author's name comes up from the properties, it merely has to look for that image name to match.



  //MAKE CHANGE---------------------------------------------------------------
  if (info.length > 0) {
    var image = 'images/' + info[0].properties.author_name + '.jpg'
    //i.e. image = images/Sikdar,Sunanda.jpg
    var formatted_image = '<center>' + '<img width=90% src="' + image + '"/>' + '</center>'

    document.getElementById('infobox_content').innerHTML = '<h5>' + "Name: " + info[0].properties.author_name + '</h5>' + formatted_image +
      '<p>' + "Text title: " + info[0].properties.text_title + '</p><p>' + "Location: " + info[0].properties.location_name + '</p>';
    //Depending on what you want to show you can add more variables and more text The stub above generates the author_name, text_title, the location_name and the frequency count.

  } else {
    document.getElementById('infobox_content').innerHTML = '<p>Hover over an area</p>';
  }
});


function createLegend() {
  //LEGEND TEXT
  //the var layers array sets the text that will show up in the legend. you can enter any value here it is just text. Make sure that the legend values correspond to the ones you set in Mapbox.
  var layers = ['17% Negative Interactions', '32% Negative Interactions', '34% Negative Interactions'];

  //LEGEND COLORS
  //Set the corresponding LEGEND colors using HEX the easiest way to do this is by setting your mapcolors in Mapbox using ColorBrewer (colorbrewer2.org). Then copy the exact same hex value to the array below. Remember that each label above should correspond to a color. If the number of items in layers does not match the number of values in colors you will get an error.
  var colors = ['#fc9797', '#ed5a5a', '#d53939'];

//run through each element in the legend array and create a new legend item.
  for (i = 0; i < layers.length; i++) {
    var layer = layers[i];
    var color = colors[i];
    var item = document.createElement('div');
    var key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    var value = document.createElement('span');
    value.innerHTML = layer;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  }
  //LEGEND CODE


}



const chapters = {
'part_1': {
duration: 5000,
bearing:0,
center: [78.0688997, 23.5272803],
zoom: 3.5,
pitch: 0
},
'part_2': {
duration: 5000,
center: [70.5141829, 30.7656822],
bearing: 315,
zoom: 4.5,
pitch: 0
},
'part_3': {
duration: 5000,
bearing: 0,
center: [81.2383, 24.0767],
zoom: 3.8,
pitch: 0
},
'part_4': {
duration: 5000,
bearing: 45,
center: [90.5736788, 23.6343083],
zoom: 6,
pitch: 0
},
'part_5': {
duration: 5000,
bearing: 45,
center: [74.1835, 31.6239],
zoom: 5,
pitch: 45,
curve:1
},
'part_6': {
duration: 5000,
bearing: 25,
center: [80.9688997, 27.0272803],
zoom: 6,
pitch: 45
}
};

let activeChapterName = 'part_1';
function setActiveChapter(chapterName) {
if (chapterName === activeChapterName) return;

map.flyTo(chapters[chapterName]);

document.getElementById(chapterName).classList.add('active');
document.getElementById(activeChapterName).classList.remove('active');

activeChapterName = chapterName;
}

function isElementOnScreen(id) {
const element = document.getElementById(id);
const bounds = element.getBoundingClientRect();
return bounds.top < window.innerHeight && bounds.bottom > 0;
}

// On every scroll event, check which element is on screen
window.onscroll = () => {
for (const chapterName in chapters) {
if (isElementOnScreen(chapterName)) {
  // if (chapterName == 'part_1') createLegend();
  setActiveChapter(chapterName);
break;
}
}
};
