using System.Collections.Generic;
using DotnetSpa.WebApi.Models;

namespace DotnetSpa.WebApi.Data
{
    internal class MockOrders
    {
        public static List<Order> Orders =
            new List<Order>
            {
                new Order
                {
                    Id = 1,
                    CustomerId = 1,
                    TotalPrice = 12.34m
                },
                new Order
                {
                    Id = 2,
                    CustomerId = 1,
                    TotalPrice = 23.45m
                }
            };
    }
}
