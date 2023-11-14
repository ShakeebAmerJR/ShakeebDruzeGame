document.addEventListener('DOMContentLoaded', function () {
    const mazeContainer = document.getElementById('maze');

    const maze = [
        ['S', 1, '#', '#', '#', '#', 1],
        [1, 0, 0, 1, 0, 0, 1],
        ['#', 0, '#', '#', '#', 0, '#'],
        ['#', 0, 0, 0, 0, 0, '#'],
        ['#', '#', '#', '#', '#', 0, '#'],
        [1, 0, 0, 1, 0, 0, 1],
        [1, '#', '#', '#', '#', '#', 'F'],
    ];

    function createMaze() {
        for (let i = 0; i < maze.length; i++) {
            for (let j = 0; j < maze[i].length; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');

                if (maze[i][j] === 'S') {
                    cell.classList.add('start');
                } else if (maze[i][j] === 'F') {
                    cell.classList.add('finish');
                } else if (maze[i][j] === '#') {
                    cell.style.backgroundColor = 'black';
                }

                cell.textContent = maze[i][j];
                mazeContainer.appendChild(cell);
            }
        }
    }

    createMaze();

    document.addEventListener('keydown', function (event) {
        movePlayer(event.key);
    });

    function movePlayer(direction) {
        const cells = document.querySelectorAll('.cell');
        let currentIndex;

        cells.forEach((cell, index) => {
            if (cell.classList.contains('start')) {
                currentIndex = index;
            }
        });

        let newIndex;

        switch (direction) {
            case 'ArrowUp':
                newIndex = currentIndex - maze[0].length;
                break;
            case 'ArrowDown':
                newIndex = currentIndex + maze[0].length;
                break;
            case 'ArrowLeft':
                newIndex = currentIndex - 1;
                break;
            case 'ArrowRight':
                newIndex = currentIndex + 1;
                break;
            default:
                return;
        }

        if (newIndex >= 0 && newIndex < cells.length && !cells[newIndex].classList.contains('finish') && !cells[newIndex].style.backgroundColor.includes('black')) {
            cells[currentIndex].classList.remove('start');
            cells[newIndex].classList.add('start');
        }

        if (cells[newIndex].classList.contains('finish')) {
            alert('Congratulations! You reached the finish.');
            restartGame();
        }
    }

    window.restartGame = function () {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            if (cell.classList.contains('start')) {
                cell.classList.remove('start');
            }
            if (cell.classList.contains('finish')) {
                cell.classList.remove('finish');
            }
        });
        createMaze();
    };
});
