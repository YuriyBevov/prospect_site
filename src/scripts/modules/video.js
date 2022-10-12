const videos = document.querySelectorAll('video');

if(videos) {
  videos.forEach(video => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach( entry => {
        if(entry.isIntersecting) {
          video.play('muted');
          console.log('played');
        } else {
          if(video.currentTime > 0){
            video.pause();
            console.log('paused');
          }
        }
      });
    });

    observer.observe(video);
  });
};
