// Data Management System using localStorage
// This replaces the PHP/MySQL backend with browser-based storage

const DB = {
    // Initialize database with default data
    init() {
        if (!localStorage.getItem('users')) {
            const defaultUsers = [
                {
                    id: 1,
                    email: 'admin@university.edu',
                    password: 'admin123',
                    firstName: 'Admin',
                    lastName: 'User',
                    profilePicture: 'default-avatar.png',
                    course: '',
                    yearOfStudy: '',
                    bio: 'System Administrator',
                    interests: '',
                    isAdmin: true,
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('users', JSON.stringify(defaultUsers));
        }

        if (!localStorage.getItem('posts')) {
            localStorage.setItem('posts', JSON.stringify([]));
        }

        if (!localStorage.getItem('events')) {
            localStorage.setItem('events', JSON.stringify([]));
        }

        if (!localStorage.getItem('feedback')) {
            localStorage.setItem('feedback', JSON.stringify([]));
        }

        if (!localStorage.getItem('ideas')) {
            localStorage.setItem('ideas', JSON.stringify([]));
        }

        if (!localStorage.getItem('comments')) {
            localStorage.setItem('comments', JSON.stringify([]));
        }

        if (!localStorage.getItem('likes')) {
            localStorage.setItem('likes', JSON.stringify([]));
        }

        if (!localStorage.getItem('eventRegistrations')) {
            localStorage.setItem('eventRegistrations', JSON.stringify([]));
        }

        if (!localStorage.getItem('ideaVotes')) {
            localStorage.setItem('ideaVotes', JSON.stringify([]));
        }
    },

    // Helper functions
    getUsers() {
        return JSON.parse(localStorage.getItem('users') || '[]');
    },

    saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    },

    getPosts() {
        return JSON.parse(localStorage.getItem('posts') || '[]');
    },

    savePosts(posts) {
        localStorage.setItem('posts', JSON.stringify(posts));
    },

    getEvents() {
        return JSON.parse(localStorage.getItem('events') || '[]');
    },

    saveEvents(events) {
        localStorage.setItem('events', JSON.stringify(events));
    },

    getFeedback() {
        return JSON.parse(localStorage.getItem('feedback') || '[]');
    },

    saveFeedback(feedback) {
        localStorage.setItem('feedback', JSON.stringify(feedback));
    },

    getIdeas() {
        return JSON.parse(localStorage.getItem('ideas') || '[]');
    },

    saveIdeas(ideas) {
        localStorage.setItem('ideas', JSON.stringify(ideas));
    },

    getComments() {
        return JSON.parse(localStorage.getItem('comments') || '[]');
    },

    saveComments(comments) {
        localStorage.setItem('comments', JSON.stringify(comments));
    },

    getLikes() {
        return JSON.parse(localStorage.getItem('likes') || '[]');
    },

    saveLikes(likes) {
        localStorage.setItem('likes', JSON.stringify(likes));
    },

    getEventRegistrations() {
        return JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
    },

    saveEventRegistrations(registrations) {
        localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
    },

    getIdeaVotes() {
        return JSON.parse(localStorage.getItem('ideaVotes') || '[]');
    },

    saveIdeaVotes(votes) {
        localStorage.setItem('ideaVotes', JSON.stringify(votes));
    },

    // User operations
    createUser(userData) {
        const users = this.getUsers();
        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        this.saveUsers(users);
        return newUser;
    },

    findUserByEmail(email) {
        const users = this.getUsers();
        return users.find(u => u.email === email);
    },

    findUserById(id) {
        const users = this.getUsers();
        return users.find(u => u.id === id);
    },

    updateUser(userId, updates) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.id === userId);
        if (index !== -1) {
            users[index] = { ...users[index], ...updates };
            this.saveUsers(users);
            return users[index];
        }
        return null;
    },

    // Post operations
    createPost(postData) {
        const posts = this.getPosts();
        const newPost = {
            id: Date.now(),
            ...postData,
            createdAt: new Date().toISOString()
        };
        posts.unshift(newPost);
        this.savePosts(posts);
        return newPost;
    },

    deletePost(postId) {
        const posts = this.getPosts().filter(p => p.id !== postId);
        this.savePosts(posts);
        // Also delete associated comments and likes
        const comments = this.getComments().filter(c => c.postId !== postId);
        this.saveComments(comments);
        const likes = this.getLikes().filter(l => l.postId !== postId);
        this.saveLikes(likes);
    },

    // Event operations
    createEvent(eventData) {
        const events = this.getEvents();
        const newEvent = {
            id: Date.now(),
            ...eventData,
            createdAt: new Date().toISOString()
        };
        events.push(newEvent);
        this.saveEvents(events);
        return newEvent;
    },

    deleteEvent(eventId) {
        const events = this.getEvents().filter(e => e.id !== eventId);
        this.saveEvents(events);
        const registrations = this.getEventRegistrations().filter(r => r.eventId !== eventId);
        this.saveEventRegistrations(registrations);
    },

    // Event registration
    registerForEvent(eventId, userId) {
        const registrations = this.getEventRegistrations();
        const existing = registrations.find(r => r.eventId === eventId && r.userId === userId);
        if (existing) {
            // Unregister
            const newRegistrations = registrations.filter(r => r.id !== existing.id);
            this.saveEventRegistrations(newRegistrations);
            return false;
        } else {
            // Register
            const newRegistration = {
                id: Date.now(),
                eventId,
                userId,
                registeredAt: new Date().toISOString()
            };
            registrations.push(newRegistration);
            this.saveEventRegistrations(registrations);
            return true;
        }
    },

    isUserRegisteredForEvent(eventId, userId) {
        const registrations = this.getEventRegistrations();
        return registrations.some(r => r.eventId === eventId && r.userId === userId);
    },

    getEventRegistrationCount(eventId) {
        const registrations = this.getEventRegistrations();
        return registrations.filter(r => r.eventId === eventId).length;
    },

    // Feedback operations
    createFeedback(feedbackData) {
        const feedback = this.getFeedback();
        const newFeedback = {
            id: Date.now(),
            ...feedbackData,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        feedback.unshift(newFeedback);
        this.saveFeedback(feedback);
        return newFeedback;
    },

    updateFeedbackStatus(feedbackId, status) {
        const feedback = this.getFeedback();
        const index = feedback.findIndex(f => f.id === feedbackId);
        if (index !== -1) {
            feedback[index].status = status;
            this.saveFeedback(feedback);
        }
    },

    // Idea operations
    createIdea(ideaData) {
        const ideas = this.getIdeas();
        const newIdea = {
            id: Date.now(),
            ...ideaData,
            votes: 0,
            createdAt: new Date().toISOString()
        };
        ideas.push(newIdea);
        this.saveIdeas(ideas);
        return newIdea;
    },

    voteForIdea(ideaId, userId) {
        const votes = this.getIdeaVotes();
        const existing = votes.find(v => v.ideaId === ideaId && v.userId === userId);
        const ideas = this.getIdeas();
        const ideaIndex = ideas.findIndex(i => i.id === ideaId);

        if (existing) {
            // Remove vote
            const newVotes = votes.filter(v => v.id !== existing.id);
            this.saveIdeaVotes(newVotes);
            if (ideaIndex !== -1) {
                ideas[ideaIndex].votes--;
                this.saveIdeas(ideas);
            }
            return false;
        } else {
            // Add vote
            const newVote = {
                id: Date.now(),
                ideaId,
                userId,
                votedAt: new Date().toISOString()
            };
            votes.push(newVote);
            this.saveIdeaVotes(votes);
            if (ideaIndex !== -1) {
                ideas[ideaIndex].votes++;
                this.saveIdeas(ideas);
            }
            return true;
        }
    },

    hasUserVotedForIdea(ideaId, userId) {
        const votes = this.getIdeaVotes();
        return votes.some(v => v.ideaId === ideaId && v.userId === userId);
    },

    // Comment operations
    createComment(commentData) {
        const comments = this.getComments();
        const newComment = {
            id: Date.now(),
            ...commentData,
            createdAt: new Date().toISOString()
        };
        comments.push(newComment);
        this.saveComments(comments);
        return newComment;
    },

    getCommentsByPost(postId) {
        return this.getComments().filter(c => c.postId === postId);
    },

    getCommentsByIdea(ideaId) {
        return this.getComments().filter(c => c.ideaId === ideaId);
    },

    deleteComment(commentId) {
        const comments = this.getComments().filter(c => c.id !== commentId);
        this.saveComments(comments);
    },

    // Like operations
    toggleLike(postId, userId) {
        const likes = this.getLikes();
        const existing = likes.find(l => l.postId === postId && l.userId === userId);

        if (existing) {
            // Unlike
            const newLikes = likes.filter(l => l.id !== existing.id);
            this.saveLikes(newLikes);
            return false;
        } else {
            // Like
            const newLike = {
                id: Date.now(),
                postId,
                userId,
                likedAt: new Date().toISOString()
            };
            likes.push(newLike);
            this.saveLikes(likes);
            return true;
        }
    },

    hasUserLikedPost(postId, userId) {
        const likes = this.getLikes();
        return likes.some(l => l.postId === postId && l.userId === userId);
    },

    getLikeCount(postId) {
        const likes = this.getLikes();
        return likes.filter(l => l.postId === postId).length;
    },

    // Statistics
    getStats() {
        return {
            totalUsers: this.getUsers().length,
            totalPosts: this.getPosts().length,
            totalEvents: this.getEvents().length,
            totalFeedback: this.getFeedback().length,
            totalIdeas: this.getIdeas().length,
            pendingFeedback: this.getFeedback().filter(f => f.status === 'pending').length
        };
    }
};

// Initialize database on load
DB.init();
