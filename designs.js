"use strict";
(function ($) {
    $(document).ready(function () {
        const canvasTable = $('#pixel_canvas');
        const colorPicker = $('#colorPicker');
        const showHideBordersBtn = $('#input_show_hide_borders');

        // Example picture
        canvasTable.load('./pixel-smile.html');
        showHideBorders();
        setupListeners();

        $('#sizePicker').submit(makeGrid);

        function makeGrid(event) {
            event.preventDefault();
            canvasTable.empty();

            const height = $('#input_height').val();
            const width = $('#input_width').val();

            for (let i = 0; i < height; i++) {
                canvasTable.append('<tr></tr>');
            }

            const tableRows = canvasTable.children();
            for (let j = 0; j < width; j++) {
                tableRows.append('<td></td>');
            }

            showHideBorders();
            setupListeners();
        }

        function setupListeners() {
            // Prevents the dragging of table cells while drawing
            canvasTable.on('dragstart', function (event) {
                event.preventDefault();
            });
            canvasTable.on('drop', function (event) {
                event.preventDefault();
            });

            canvasTable.on('click', 'td', draw);
            showHideBordersBtn.on('click', showHideBorders);

            // Draw while holding left mouse button down
            canvasTable.on('mousedown', function (event) {
                // Only for left mouse button
                if (event.which === 1) {
                    draw(event);
                    canvasTable.on('mousemove', 'td', draw);
                    $(window).on('mouseup', function () {
                        canvasTable.off('mousemove');
                    });
                }
            });
        }

        function draw(event) {
            const color = colorPicker.val();
            $(event.target).css('background-color', color);
        }

        function showHideBorders() {
            if (showHideBordersBtn[0].checked) {
                canvasTable.find('tr').css('border', '');
                canvasTable.find('td').css('border', '');
            } else {
                canvasTable.find('tr').css('border', '0');
                canvasTable.find('td').css('border', '0');
            }
        }

        /* function erase(event) {
            const color = '';
            $(event.target).css('background-color', color);
        } */
    });
})(jQuery);