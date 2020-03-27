  $(function () {
    $("#example1").DataTable({
        "autoWidth": false,
        "searching": false,
    });
    $("#dataTable").DataTable({
      "autoWidth": false,
      // "ordering": false,
      // "paging": false,
      // "lengthChange": false,
      // "info": false,
      // "searching": false,
  });
    $('#example2').DataTable({
      "paging": true,
      "lengthChange": false,
      "searching": false,
      "ordering": true,
      "info": true,
      "autoWidth": false,
    });
  });