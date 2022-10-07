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
};
