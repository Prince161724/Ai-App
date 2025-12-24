import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import Spinner from './spinner'



function Home() {
  const navi = useNavigate();
  
  useEffect(() => {
    if (! localStorage.getItem('enteryallowed')) {
      navi('/');
    }
  }, []);

  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [show, setShow] = useState(false);
  const [reply, setReply] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const fil = e.target. elements.pdf.files[0];
    if(fil.size>10485760) {
      alert('Max File Should me 10 MB Limits');
      return ;
    }
    setShow(true);
    const formData = new FormData();
    formData.append('pdf', fil);

    try {
      const response = await fetch(
        `https://backend-ai-w92s.onrender.com/${localStorage.getItem('email')}`,
        {
          method: "POST",  // ✅ Fixed
          body: formData
        }
      );

      const res = await response.json();
      
      if (res.success) {
        setCount(1);
        alert('Uploaded PDF!  Now you can ask questions');
        
        // Delete local file
        await fetch(`https://backend-ai-w92s.onrender.com/delete`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON. stringify({ path: res.path })  // ✅ Fixed
        });
      }
    } catch (error) {
      alert('Error uploading file');
      console.error(error);
    } finally {
      setShow(false);
    }
  };

  const Ask = async () => {
    if (! text.trim()) return;
    
    setShow(true);
    
    try {
      const response = await fetch(`https://backend-ai-w92s.onrender.com/askQuestion`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'  // ✅ Added
        },
        body: JSON.stringify({
          ques: text,
          gmail: localStorage.getItem('email')
        })
      });

      const res = await response.json();
      
      setReply((prev) => [...prev, res. answer]);
      setText('');  // Clear input
    } catch (error) {
      alert('Error getting answer');
      console.error(error);
    } finally {
      setShow(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem('enteryallowed');
    localStorage.removeItem('email');
    navi('/');
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">AI PDF Assistant</h1>
        <button className="logout-btn" onClick={logOut}>Log Out</button>
      </div>
      
      {!show && count === 0 && (
        <div className="upload-section">
          <form className="upload-form" onSubmit={onSubmit} encType="multipart/form-data">
            <label className="upload-label">Upload Your PDF Document</label>
            <div className="file-input-wrapper">
              <input type="file" name="pdf" accept=".pdf" required />
            </div>
            <button className="upload-btn" type="submit">Upload PDF</button>
          </form>
        </div>
      )}
      
      {show && <Spinner />}
      
      {!show && count !== 0 && (
        <div className="question-section">
          <div className="question-input-wrapper">
            <input
              className="question-input"
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="Ask a question about your PDF..."
            />
            <button className="ask-btn" type="button" onClick={Ask}>
              Ask Question
            </button>
          </div>
        </div>
      )}
      
      {reply.length > 0 && (
        <div className="answers-section">
          {reply.map((answer, index) => (
            <div key={index} className="answer-card">
              <div className="answer-question">Question {index + 1}</div>
              <div className="answer-text">{answer}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;