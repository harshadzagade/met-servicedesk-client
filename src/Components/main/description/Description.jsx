import React from 'react';
import '../../../css/style.css';
import '../description/Description.css';

const Description = () => {
  return (
    
    
    <main>

      <div className="info-ticket-title">
        <div className="info-tik-head">
          <h2 className="info-tik-title">
            Replace Keyboard
          </h2>
          <p className="info-tik-id">
            #3256
          </p>
          <p className="info-tik-pri">
            High
          </p>
        </div>
      </div>

      <section className="desc-chat">
        <div className="tik-desc-chat">
          <div className="msg left-msg">
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">BOT</div>
                <div className="msg-info-time">12:45</div>
              </div>

              <div className="msg-text">
                Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
              </div>
            </div>
          </div>

          <div className="msg right-msg">

            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">Harshad</div>
                <div className="msg-info-time">12:46</div>
              </div>

              <div className="msg-text">
                You can change your name in JS section!
              </div>
            </div>
          </div>
        </div>

        <form className="msger-inputarea">
          <input type="text" className="msger-input" placeholder="Enter your message..."/>
          <button type="submit" className="msger-send-btn">Send</button>
        </form>
      </section>

    </main>
  )
}

export default Description