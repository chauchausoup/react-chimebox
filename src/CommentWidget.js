import React, { useState, useRef } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import axios from 'axios';

const CommentWidget = ({ siteId,turnstileDataSiteKey }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState(null);
    const [turnstileLoaded, setTurnstileLoaded] = useState(false);

    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    const spinnerRef = useRef(null);
    const formContainerRef = useRef(null);
    const sitekey = turnstileDataSiteKey;

    const toggleWidgetVisibility = () => {
        setIsVisible(!isVisible);
        if (!isVisible) {
            if (!turnstileLoaded) {
                const turnstileScript = document.createElement('script');
                turnstileScript.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
                turnstileScript.async = true;
                turnstileScript.defer = true;
                document.head.appendChild(turnstileScript);

                turnstileScript.onload = () => {
                    setTurnstileLoaded(true);
                };
            }
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!turnstileToken) {
            alert('Please complete the CAPTCHA');
            return;
        }

        setLoading(true);
        if (spinnerRef.current) {
            spinnerRef.current.style.display = 'block';
        }

        try {
            // Send data as query parameters
            const response = await axios.get('https://chimebox.me/.netlify/functions/postComment', {
                params: {
                    siteId,
                    name,
                    comment,
                    turnstileToken,
                },
            });

            if (response.status !== 200) {
                throw new Error('Failed to submit comment');
            }

            alert('Comment submitted successfully!');
            setName('');
            setComment('');

            const currentTime = new Date().getTime();
            localStorage.setItem('lastSubmissionTime', currentTime.toString()); // Store submission time
        } catch (error) {
            alert('Error submitting comment: ' + error.message);
        } finally {
            setLoading(false);
            if (spinnerRef.current) {
                spinnerRef.current.style.display = 'none';
            }
        }
    };

    return (
        <>
            <button id="comment-widget-button" onClick={toggleWidgetVisibility} style={styles.button}>
                💬
            </button>

            {isVisible && (
                <div id="comment-widget-container" style={styles.container}>
                    <button
                        id="closeWidget"
                        className="close-widget"
                        onClick={() => setIsVisible(false)}
                        style={styles.closeButton}>
                        &times;
                    </button>

                    <div id="commentFormContainer" ref={formContainerRef}>
                        <form id="commentForm" onSubmit={handleFormSubmit}>
                            <input
                                type="text"
                                value={name}
                                id="userName"
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your Name"
                                required
                                style={styles.input}
                            />
                            <textarea
                                value={comment}
                                id="userComment"
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Your Comment"
                                required
                                style={styles.textarea}
                            />

                            {turnstileLoaded && (
                                <Turnstile siteKey={sitekey} onSuccess={(token) => setTurnstileToken(token)} />
                            )}

                            <div
                                className="spinner"
                                id="loadingSpinner"
                                ref={spinnerRef}
                                style={styles.spinner}></div>

                            <button
                                type="submit"
                                className="submit-button"
                                disabled={loading}
                                style={styles.submitButton}>
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                            <button
                                type="button"
                                className="close-button"
                                onClick={() => setIsVisible(false)}
                                style={styles.closeButtonForm}>
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

const styles = {
    button: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '60px',
        height: '60px',
        backgroundColor: '#0077b6',
        color: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '30px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease',
        zIndex: 1000,
    },
    container: {
        position: 'fixed',
        bottom: '100px',
        right: '20px',
        width: '100%',
        maxWidth: '400px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#fff',
        textAlign: 'center',
        zIndex: 999,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#999',
        cursor: 'pointer',
    },
    closeButtonForm: {
        backgroundColor: '#f44336',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
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
    },
    submitButton: {
        backgroundColor: '#0077b6',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    spinner: {
        display: 'none',
        margin: '10px auto',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #3498db',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite',
    },
};

export default CommentWidget;
