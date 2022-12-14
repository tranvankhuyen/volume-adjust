let listtabs = document.querySelector('.tabs')

// main extension
function app(tabs) {
  logTabs(tabs) // => print tabs into screen
  initializeAndHandleInputAudio(tabs)
}

function logTabs(tabs) {

  // Loop over tabs to create HTML element
  for (let i = 0; i < tabs.length; i++) {
    // Create wrap for a tab
    let div = document.createElement('div')
    // Sub div include input slider
    let subDiv = document.createElement('div')
    // p element => tab title
    let p = document.createElement('p')
    let tabTitle = document.createTextNode(`${tabs[i].title}`)
    let titleIcon = document.createElement('img')
    titleIcon.src = tabs[i].favIconUrl
    titleIcon.className = 'title-icon'
    div.className = 'tab'
    subDiv.className = 'sub-div'
    p.className = 'title'

// ----> Create Input Slider  (HTML ->  JS)

    // <div className = "slider-container" >
    //   <div className = "progress-bar" > < /div>
    // <input className="slider" type="range" min="0" max="100" value="50">
    //   <div className="thumb">
    //     <div className="thumbBtn"></div>
    //     <div className="volume-value"></div>
    //   </div>
    // </div>
    let sliderContainer = document.createElement('div')
    let progressBar = document.createElement('div')
    let sliderInput = document.createElement('input')
    let thumb = document.createElement('div')
    let thumbBtn = document.createElement('div')
    let volumeValue = document.createElement('div')
    sliderContainer.className = 'slider-container'
    progressBar.className = 'progress-bar'
    sliderInput.className = 'slider'
    thumb.className = 'thumb'
    thumbBtn.className = 'thumbBtn'
    volumeValue.className = 'volume-value'
    sliderInput.type = 'range'
    sliderInput.min = '0'
    sliderInput.max = '100'
    sliderInput.value = '50'
    thumb.appendChild(thumbBtn)
    thumb.appendChild(volumeValue)
    sliderContainer.appendChild(progressBar)
    sliderContainer.appendChild(sliderInput)
    sliderContainer.appendChild(thumb)
    // INPUT SLIDER

    subDiv.appendChild(sliderContainer)
    p.appendChild(tabTitle)
    div.appendChild(titleIcon)
    div.appendChild(p)
    div.appendChild(subDiv)

    // add to DOM
    listtabs.appendChild(div)
  }
}

function onError(error) {
  console.error(`Error: ${error}`);
}


function initializeAndHandleInputAudio(listtabs) {
  // slider => all input slider elements
  let slider = document.querySelectorAll('.slider')
  // Dot move left right
  let thumb = document.querySelectorAll('.thumb')
  // volume value on thumb
  let volumeValue = document.querySelectorAll('.volume-value')
  let progressBar = document.querySelectorAll('.progress-bar')
// Loop over tabs elements
  let sliderLength = slider.length
  for (let i = 0; i < sliderLength; i++) {
    // initialize volume Value on thumb
    volumeValue[i].innerHTML = slider[i].value
    // event when input slider is changed
    slider[i].oninput = function () {
      // css style with js
      thumb[i].style.left = this.value + "%"
      volumeValue[i].innerHTML = this.value
      progressBar[i].style.width = this.value + "%"

      // // store volume, if tab is reloaded =>  get value and reset
      // chrome.storage.sync.set({key: volume}, function () {
      //   console.log('Value is set to ' + volume);
      // });

      // handle volume blabla
      adjustVolume(listtabs, slider)
    }
  }
}

function adjustVolume(listtabs, inputs) {
  for (let i = 0; i < inputs.length; i++) {
    let volume = inputs[i].value
    chrome.tabs.sendMessage(listtabs[i].id, {
      message: "adjust_volume", volume: volume
    })
  }
}

// get all current tabs
chrome.tabs.query({active: false}).then(app, onError);


