const videos = document.querySelectorAll('video');

if(videos) {
  videos.forEach(video => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach( entry => {
        if(entry.isIntersecting) {
          video.play('muted');
        } else {
          if(video.currentTime > 0){
            video.pause();
          }
        }
      });
    });

    observer.observe(video);
  });
}

/*



  $('body').on('click touchstart', function () {
    const videoElement = document.getElementById('home_video');
    if (videoElement.playing) {
        // video is already playing so do nothing
    }
    else {
        // video is not playing
        // so play video now
        videoElement.play();
    }
  });
*/
