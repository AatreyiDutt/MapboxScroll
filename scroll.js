mapboxgl.accessToken = 'pk.eyJ1IjoiYWF0cmV5aWR1dHQiLCJhIjoiY2wyNG52cmcxMjF5NzNjcDZob3VkYXpjbiJ9.T5P5CysazB1XMUPjKX9Kiw';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/aatreyidutt/cl2rdcs7f003i14mfihnmswkd',
center: [77.0688997, 22.5272803],
zoom: 3,
bearing: 0,
pitch: 0
});

const chapters = {
'part_1': {
bearing:0,
center: [78.0688997, 23.5272803],
zoom: 3,
pitch: 0
},
'part_2': {
duration: 7000,
center: [70.3141829, 30.5656822],
bearing: 315,
zoom: 5,
pitch: 0
},
'part_3': {
bearing: 0,
center: [80.3383, 23.5767],
zoom: 4,
speed: 1,
pitch: 0
},
'part_4': {
bearing: 45,
center: [90.0736788, 24.0343083],
zoom: 10,
pitch: 0,
},
'part_5': {
bearing: 45,
center: [74.1835, 31.6239],
zoom: 5,
pitch: 10,
speed: 1,
curve:1,
pitch: 30
},
'part_6': {
bearing: 25,
center: [80.9688997, 27.0272803],
zoom: 6
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
setActiveChapter(chapterName);
break;
}
}
};
