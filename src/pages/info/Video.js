import React from 'react'

const Video = () => {
  return (
    <div>
     <div style={{ marginLeft: '150px', textAlign: 'center' }}>
          <iframe
            width="760"
            height="515"
            src="https://www.youtube.com/embed/WjMYfGvvLss"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
    </div>
  )
}

export default Video