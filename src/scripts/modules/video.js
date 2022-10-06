const videos = document.querySelectorAll('video');
console.log(videos)
if(videos) {
  videos.forEach(video => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach( entry => {
        if(entry.isIntersecting) {
          video.play('muted');
          console.log('play')
        } else {
          if(video.currentTime > 0){
            video.pause();
            console.log('paused')
          }
        }
      });
    });

    observer.observe(video);
  });
};
