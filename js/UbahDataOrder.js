// Fetch sidebar content
fetch("sidebar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("sidebar").innerHTML = data;
  });

// Variable to track the currently edited order
let currentOrderIndex = null;

$(document).ready(function () {
  // Fetch and display orders from JSON
  $.getJSON("/JSON/dataOrders.json", function (ordersData) {
    const $tableBody = $("#ordersTable");

    // Loop through the orders and append them to the table
    ordersData.orders.forEach((order, index) => {
      const row = `
        <tr data-index="${index}">
          <td>${order.itemName}</td>
          <td>${order.itemWeight}</td>
          <td>${order.itemDistance}</td>
          <td>${order.pickupLocation}</td>
          <td>${order.deliveryLocation}</td>
          <td>${order.senderName}</td>
          <td>${order.receiverName}</td>
          <td>${order.phoneNumber}</td>
          <td>
            <button class="btn-edit" data-index="${index}">Edit</button>
            <button class="btn-delete" data-index="${index}">Delete</button>
          </td>
        </tr>
      `;
      $tableBody.append(row);
    });

    // Handle edit button click
    $(".btn-edit").click(function () {
      const row = $(this).closest("tr");
      currentOrderIndex = row.data("index");
      const order = ordersData.orders[currentOrderIndex];

      // Open modal
      document.getElementById("editModal").style.display = "block";

      // Populate modal fields with current order data
      $("#itemName").val(order.itemName);
      $("#itemWeight").val(order.itemWeight); // Set dropdown value
      $("#itemDistance").val(order.itemDistance);
      $("#pickupLocation").val(order.pickupLocation);
      $("#deliveryLocation").val(order.deliveryLocation);
      $("#senderName").val(order.senderName);
      $("#receiverName").val(order.receiverName);
      $("#phoneNumber").val(order.phoneNumber);
    });

    // Handle save changes
    $("#editForm").submit(function (event) {
      event.preventDefault();

      if (currentOrderIndex !== null) {
        const order = ordersData.orders[currentOrderIndex];

        // Update order with new values
        order.itemName = $("#itemName").val();
        order.itemWeight = $("#itemWeight").val(); // Get dropdown value
        order.itemDistance = $("#itemDistance").val();
        order.pickupLocation = $("#pickupLocation").val();
        order.deliveryLocation = $("#deliveryLocation").val();
        order.senderName = $("#senderName").val();
        order.receiverName = $("#receiverName").val();
        order.phoneNumber = $("#phoneNumber").val();

        // Update table row
        const $row = $(`tr[data-index="${currentOrderIndex}"]`);
        $row.find("td:nth-child(1)").text(order.itemName);
        $row.find("td:nth-child(2)").text(order.itemWeight);
        $row.find("td:nth-child(3)").text(order.itemDistance);
        $row.find("td:nth-child(4)").text(order.pickupLocation);
        $row.find("td:nth-child(5)").text(order.deliveryLocation);
        $row.find("td:nth-child(6)").text(order.senderName);
        $row.find("td:nth-child(7)").text(order.receiverName);
        $row.find("td:nth-child(8)").text(order.phoneNumber);

        // Close modal and reset index
        document.getElementById("editModal").style.display = "none";
        currentOrderIndex = null;
      }
    });

    // Handle delete button click
    $(".btn-delete").click(function () {
      const row = $(this).closest("tr");
      const index = row.data("index");
      row.remove(); // Remove the row from the table
      ordersData.orders.splice(index, 1); // Remove the order from data
      alert("Order deleted!");
    });
  }).fail(function () {
    console.error("Failed to fetch data from JSON.");
  });

  // Close modal when clicked outside
  $(window).click(function (event) {
    if (event.target == document.getElementById("editModal")) {
      document.getElementById("editModal").style.display = "none";
      currentOrderIndex = null; // Reset the current order index
    }
  });

  // Close modal when clicking on close button
  $(".close").click(function () {
    document.getElementById("editModal").style.display = "none";
    currentOrderIndex = null; // Reset the current order index
  });
});
