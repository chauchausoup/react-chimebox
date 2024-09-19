import React, { useState } from 'react';

const CommentWidget = ({ siteId }) => {
  const [showForm, setShowForm] = useState(false);  // State to toggle form visibility
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`https://confessify.netlify.app/.netlify/functions/postComment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId, name, comment }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const result = await response.json();
      setMessage('Comment submitted successfully!');
      setName('');
      setComment('');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="comment-widget-container" style={styles.widgetContainer}>
      {!showForm && (
        <button onClick={handleOpenForm} style={styles.commentButton}>
          Leave a Comment
        </button>
      )}

      {showForm && (
        <div id="commentFormContainer">
          <form id="commentForm" onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              id="userName"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
            <textarea
              id="userComment"
              placeholder="Your Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              style={styles.textarea}
            />
            <button type="submit" style={styles.submitButton} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

const styles = {
  widgetContainer: {
    width: '100%',
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  commentButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '15px 30px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  form: {
    marginTop: '20px',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '16px',
    height: '150px',
    resize: 'vertical',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default CommentWidget;
