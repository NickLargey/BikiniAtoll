(function() {

  var states = ['none', 'loop_time', 'loop_start', 'audio_speed', 'video_size'];
  var currentState = 'none';

  var video, audio;
  var audioLoopTime = 198000;
  var audioStartTime = 1;

  var onSplashScreen = true;
  document.addEventListener('click', function() {
    if (onSplashScreen) {
      var splash = document.querySelector('.splash');
      splash.style.opacity = 0;
      setTimeout(function() {
        splash.style.display = 'none';
      }, 1000);

      start();
      onSplashScreen = false;
    }
  });

  function start () {
    video = createVideo('Bikini Atoll', 'media/ADC-7174.mp4');
    document.body.appendChild(video);
    playVideo(video);

    var bodyImages = ['hao_ucar_gm_1845.jpg'];
    createPhotoList('First Space Photo', bodyImages);

    var otherImages = ['nssdc_1959-014A.jpg','nssdc_1961-021A.jpg','nssdc_1965-056A.jpg','nssdc_1966-006A-browse.jpg',
                     'nssdc_1966-027A-browse.jpg','Sputnik_Model.jpg' ];
    createPhotoList('Space Junk', otherImages);

    audio = createAudio('media/DarkWasTheNight.mp3');
    playAudio(audio);

    document.addEventListener('click', changeState);
      
    document.addEventListener('mousemove', function(ev) {
      var x = event.clientX;
      var percentX = x / window.innerWidth;
      var y = event.clientY;
      var percentY = y / window.innerHeight;

      if (currentState === 'loop_time') {
        audioLoopTime = percentX * 10000 + 40;
      }
      else if (currentState === 'loop_start') {
        audioStartTime = percentX * 5;
      }
      else if (currentState === 'audio_speed') {
        var speed = percentX * 2.5 + 0.5;
        audio.playbackRate = speed;
      }
      else if (currentState === 'video_size') {
        var width = percentX * 5 + 0.5;
        var height = percentY * 5 + 0.5;
        video.style.transform = 'scaleX(' + width + ')' + 'scaleY('+ height + ')';
      }
    });
  }

  function changeState () {
    var currentStateIndex = states.indexOf(currentState);
    var nextStateIndex = (currentStateIndex + 1) % states.length;
    currentState = states[nextStateIndex];

    var stateIndicator = document.querySelector('.state-indicator');
    stateIndicator.textContent = currentState;
  }

  function createPhotoList (text, images) {
    var header = makeHeader(text);
    document.body.appendChild(header);

    var list = document.createElement('ul');
    list.className = 'photo-list';

    images.forEach(function(url) {
      var listItem = document.createElement('li');
      var img = document.createElement('img');
      img.src = 'media/' + url;

      listItem.appendChild(img);
      list.appendChild(listItem);
    });

    document.body.appendChild(list);
  }

  function createVideo (text, src) {
    var header = makeHeader(text);
    document.body.appendChild(header);

    var video = document.createElement('video');
    video.className = 'cool-vid';
    video.preload = true;
    video.src = src;
    document.body.appendChild(video);

    return video;
  }

  function createAudio (src) {
    var audio = document.createElement('audio');
    audio.src = src;
    audio.preload = true;
    audio.autoplay = false;

    return audio;
  }

  function makeHeader (text) {
    var header = document.createElement('h1');
    header.className = 'list-header';
    header.textContent = text;

    return header;
  }

  function playVideo (vid) {
    vid.volume = 0;
    vid.playbackRate = 0.6;
    vid.play();

    fadeVolume(vid, { duration: 2000, volume: 0.5 });

    setTimeout(function() {
      fadeVolume(vid, { duration: 2000, volume: 0 });
    }, 3000);
  }

  function playAudio (audio) {
    audio.volume = 0;
    audio.play();

    fadeVolume(audio, { duration: 198000, volume: 1 });
    setupAudioLoop(audio);
  }

  function setupAudioLoop (audio) {
    loopAudio();
    function loopAudio() {
      audio.pause();
      audio.currentTime = audioStartTime;
      audio.play();
      setTimeout(loopAudio, audioLoopTime);
    }
  }


})();