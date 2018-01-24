(function($) {
    $(document).ready(function(){
        const canvasTable = $('#pixel_canvas');
        const colorPicker = $('#colorPicker');

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

            setupListeners();
        }

        function setupListeners() {
            // Prevents the dragging of table cells while drawing
            canvasTable.on('dragstart', function(event) {
                event.preventDefault();
            });
            canvasTable.on('drop', function(event) {
                event.preventDefault();
            });

            canvasTable.on('click', 'td', draw);
            canvasTable.on('mousedown', function() {
                canvasTable.on('mousemove', 'td', draw);
                $(window).on('mouseup', function() {
                    canvasTable.off('mousemove');
                });
            });
        }

        function draw(event) {
            const color = colorPicker.val();
            $(event.target).css('background-color', color);
        }
    });
})(jQuery);