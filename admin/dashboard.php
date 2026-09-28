<?php
require_once '../php/config.php';

// Check if user is logged in and is admin
if (!isset($_SESSION['user_id']) || !$_SESSION['is_admin']) {
    header("Location: ../login.php");
    exit();
}

// Handle post deletion
if (isset($_GET['delete_post']) && isset($_GET['post_id'])) {
    $post_id = intval($_GET['post_id']);
    $stmt = $conn->prepare("DELETE FROM posts WHERE id = ?");
    $stmt->bind_param("i", $post_id);
    $stmt->execute();
    $stmt->close();
    header("Location: dashboard.php");
    exit();
}

// Handle comment deletion
if (isset($_GET['delete_comment']) && isset($_GET['comment_id'])) {
    $comment_id = intval($_GET['comment_id']);
    $stmt = $conn->prepare("DELETE FROM comments WHERE id = ?");
    $stmt->bind_param("i", $comment_id);
    $stmt->execute();
    $stmt->close();
    header("Location: dashboard.php");
    exit();
}

// Handle event deletion
if (isset($_GET['delete_event']) && isset($_GET['event_id'])) {
    $event_id = intval($_GET['event_id']);
    $stmt = $conn->prepare("DELETE FROM events WHERE id = ?");
    $stmt->bind_param("i", $event_id);
    $stmt->execute();
    $stmt->close();
    header("Location: dashboard.php");
    exit();
}

// Handle feedback status update
if (isset($_GET['update_feedback']) && isset($_GET['feedback_id']) && isset($_GET['status'])) {
    $feedback_id = intval($_GET['feedback_id']);
    $status = $_GET['status'];
    $stmt = $conn->prepare("UPDATE feedback SET status = ? WHERE id = ?");
    $stmt->bind_param("si", $status, $feedback_id);
    $stmt->execute();
    $stmt->close();
    header("Location: dashboard.php");
    exit();
}

// Fetch statistics
$stats = [
    'total_users' => $conn->query("SELECT COUNT(*) as count FROM users")->fetch_assoc()['count'],
    'total_posts' => $conn->query("SELECT COUNT(*) as count FROM posts")->fetch_assoc()['count'],
    'total_events' => $conn->query("SELECT COUNT(*) as count FROM events")->fetch_assoc()['count'],
    'total_feedback' => $conn->query("SELECT COUNT(*) as count FROM feedback")->fetch_assoc()['count'],
    'total_ideas' => $conn->query("SELECT COUNT(*) as count FROM ideas")->fetch_assoc()['count'],
    'pending_feedback' => $conn->query("SELECT COUNT(*) as count FROM feedback WHERE status = 'pending'")->fetch_assoc()['count'],
];

// Fetch recent posts
$recent_posts = $conn->query("
    SELECT p.*, u.first_name, u.last_name 
    FROM posts p 
    JOIN users u ON p.user_id = u.id 
    ORDER BY p.created_at DESC 
    LIMIT 10
");

// Fetch recent events
$recent_events = $conn->query("
    SELECT e.*, u.first_name, u.last_name 
    FROM events e 
    JOIN users u ON e.created_by = u.id 
    ORDER BY e.created_at DESC 
    LIMIT 10
");

// Fetch pending feedback
$pending_feedback = $conn->query("
    SELECT * FROM feedback 
    WHERE status = 'pending' 
    ORDER BY created_at DESC 
    LIMIT 10
");

// Fetch recent ideas
$recent_ideas = $conn->query("
    SELECT i.*, u.first_name, u.last_name 
    FROM ideas i 
    JOIN users u ON i.user_id = u.id 
    ORDER BY i.created_at DESC 
    LIMIT 10
");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - UniConnect</title>
    <link rel="stylesheet" href="../css/style.css">
    <style>
        .dashboard-container {
            max-width: 1400px;
            margin: 40px auto;
            padding: 0 20px;
        }

        .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
        }

        .dashboard-header h1 {
            color: var(--primary-color);
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }

        .stat-card {
            background: var(--surface);
            padding: 25px;
            border-radius: 12px;
            box-shadow: var(--shadow);
            text-align: center;
        }

        .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 10px;
        }

        .stat-label {
            color: var(--text-secondary);
            font-size: 0.95rem;
        }

        .dashboard-sections {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 30px;
        }

        .dashboard-section {
            background: var(--surface);
            border-radius: 12px;
            padding: 30px;
            box-shadow: var(--shadow);
        }

        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .section-header h2 {
            color: var(--primary-color);
            margin: 0;
        }

        .view-all {
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 500;
        }

        .view-all:hover {
            text-decoration: underline;
        }

        .item-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .item {
            padding: 15px;
            background: var(--background);
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .item-info {
            flex: 1;
        }

        .item-title {
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 5px;
        }

        .item-meta {
            color: var(--text-secondary);
            font-size: 0.85rem;
        }

        .item-actions {
            display: flex;
            gap: 10px;
        }

        .btn-action {
            padding: 6px 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: 600;
            transition: opacity 0.3s;
        }

        .btn-action:hover {
            opacity: 0.8;
        }

        .btn-delete {
            background-color: var(--danger-color);
            color: white;
        }

        .btn-approve {
            background-color: var(--success-color);
            color: white;
        }

        .btn-review {
            background-color: var(--accent-color);
            color: white;
        }

        .badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
        }

        .badge-pending {
            background-color: #fef3c7;
            color: #d97706;
        }

        .badge-reviewed {
            background-color: #dcfce7;
            color: #16a34a;
        }

        .badge-resolved {
            background-color: #dbeafe;
            color: #2563eb;
        }

        .no-items {
            text-align: center;
            padding: 30px;
            color: var(--text-secondary);
        }

        .admin-nav {
            display: flex;
            gap: 15px;
            margin-bottom: 30px;
        }

        .admin-nav a {
            padding: 10px 20px;
            background: var(--surface);
            border-radius: 6px;
            text-decoration: none;
            color: var(--text-primary);
            font-weight: 500;
            box-shadow: var(--shadow);
            transition: all 0.3s;
        }

        .admin-nav a:hover,
        .admin-nav a.active {
            background: var(--primary-color);
            color: white;
        }

        @media (max-width: 768px) {
            .dashboard-header {
                flex-direction: column;
                gap: 15px;
                align-items: flex-start;
            }

            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .dashboard-sections {
                grid-template-columns: 1fr;
            }

            .item {
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
            }

            .item-actions {
                width: 100%;
                justify-content: flex-end;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="../index.php">UniConnect</a>
            </div>
            <ul class="nav-menu">
                <li><a href="../index.php">Home</a></li>
                <li><a href="../feed.php">Feed</a></li>
                <li><a href="../events.php">Events</a></li>
                <li><a href="../feedback.php">Feedback</a></li>
                <li><a href="../ideas.php">Ideas</a></li>
                <li><a href="../profile.php">Profile</a></li>
                <li><a href="../logout.php" class="btn-login">Logout</a></li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <div class="dashboard-container">
        <div class="dashboard-header">
            <h1>Admin Dashboard</h1>
            <p>Welcome, <?php echo htmlspecialchars($_SESSION['first_name'] . ' ' . $_SESSION['last_name']); ?></p>
        </div>

        <!-- Statistics -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number"><?php echo $stats['total_users']; ?></div>
                <div class="stat-label">Total Users</div>
            </div>
            <div class="stat-card">
                <div class="stat-number"><?php echo $stats['total_posts']; ?></div>
                <div class="stat-label">Total Posts</div>
            </div>
            <div class="stat-card">
                <div class="stat-number"><?php echo $stats['total_events']; ?></div>
                <div class="stat-label">Total Events</div>
            </div>
            <div class="stat-card">
                <div class="stat-number"><?php echo $stats['total_feedback']; ?></div>
                <div class="stat-label">Total Feedback</div>
            </div>
            <div class="stat-card">
                <div class="stat-number"><?php echo $stats['total_ideas']; ?></div>
                <div class="stat-label">Total Ideas</div>
            </div>
            <div class="stat-card">
                <div class="stat-number"><?php echo $stats['pending_feedback']; ?></div>
                <div class="stat-label">Pending Feedback</div>
            </div>
        </div>

        <!-- Dashboard Sections -->
        <div class="dashboard-sections">
            <!-- Recent Posts -->
            <div class="dashboard-section">
                <div class="section-header">
                    <h2>Recent Posts</h2>
                </div>
                <div class="item-list">
                    <?php if ($recent_posts->num_rows > 0): ?>
                        <?php while ($post = $recent_posts->fetch_assoc()): ?>
                            <div class="item">
                                <div class="item-info">
                                    <div class="item-title"><?php echo htmlspecialchars(substr($post['caption'] ?: 'No caption', 0, 50)); ?>...</div>
                                    <div class="item-meta">
                                        By <?php echo htmlspecialchars($post['first_name'] . ' ' . $post['last_name']); ?> • 
                                        <?php echo date('M j, Y', strtotime($post['created_at'])); ?>
                                    </div>
                                </div>
                                <div class="item-actions">
                                    <a href="../feed.php" class="btn-action btn-delete" onclick="return confirm('Delete this post?')">Delete</a>
                                </div>
                            </div>
                        <?php endwhile; ?>
                    <?php else: ?>
                        <div class="no-items">No posts yet</div>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Recent Events -->
            <div class="dashboard-section">
                <div class="section-header">
                    <h2>Recent Events</h2>
                </div>
                <div class="item-list">
                    <?php if ($recent_events->num_rows > 0): ?>
                        <?php while ($event = $recent_events->fetch_assoc()): ?>
                            <div class="item">
                                <div class="item-info">
                                    <div class="item-title"><?php echo htmlspecialchars($event['title']); ?></div>
                                    <div class="item-meta">
                                        <?php echo date('M j, Y', strtotime($event['event_date'])); ?> • 
                                        Created by <?php echo htmlspecialchars($event['first_name'] . ' ' . $event['last_name']); ?>
                                    </div>
                                </div>
                                <div class="item-actions">
                                    <a href="../events.php" class="btn-action btn-delete" onclick="return confirm('Delete this event?')">Delete</a>
                                </div>
                            </div>
                        <?php endwhile; ?>
                    <?php else: ?>
                        <div class="no-items">No events yet</div>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Pending Feedback -->
            <div class="dashboard-section">
                <div class="section-header">
                    <h2>Pending Feedback</h2>
                    <a href="../feedback.php" class="view-all">View All</a>
                </div>
                <div class="item-list">
                    <?php if ($pending_feedback->num_rows > 0): ?>
                        <?php while ($feedback = $pending_feedback->fetch_assoc()): ?>
                            <div class="item">
                                <div class="item-info">
                                    <div class="item-title"><?php echo htmlspecialchars($feedback['subject']); ?></div>
                                    <div class="item-meta">
                                        <?php echo ucfirst(htmlspecialchars($feedback['category'])); ?> • 
                                        <?php echo date('M j, Y', strtotime($feedback['created_at'])); ?>
                                    </div>
                                </div>
                                <div class="item-actions">
                                    <a href="dashboard.php?update_feedback=1&feedback_id=<?php echo $feedback['id']; ?>&status=reviewed" class="btn-action btn-review">Mark Reviewed</a>
                                    <a href="dashboard.php?update_feedback=1&feedback_id=<?php echo $feedback['id']; ?>&status=resolved" class="btn-action btn-approve">Mark Resolved</a>
                                </div>
                            </div>
                        <?php endwhile; ?>
                    <?php else: ?>
                        <div class="no-items">No pending feedback</div>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Recent Ideas -->
            <div class="dashboard-section">
                <div class="section-header">
                    <h2>Recent Ideas</h2>
                </div>
                <div class="item-list">
                    <?php if ($recent_ideas->num_rows > 0): ?>
                        <?php while ($idea = $recent_ideas->fetch_assoc()): ?>
                            <div class="item">
                                <div class="item-info">
                                    <div class="item-title"><?php echo htmlspecialchars($idea['title']); ?></div>
                                    <div class="item-meta">
                                        <?php echo $idea['votes']; ?> votes • 
                                        By <?php echo htmlspecialchars($idea['first_name'] . ' ' . $idea['last_name']); ?>
                                    </div>
                                </div>
                                <div class="item-actions">
                                    <a href="../ideas.php" class="btn-action btn-review">View</a>
                                </div>
                            </div>
                        <?php endwhile; ?>
                    <?php else: ?>
                        <div class="no-items">No ideas yet</div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>

    <script src="../js/main.js"></script>
</body>
</html>
