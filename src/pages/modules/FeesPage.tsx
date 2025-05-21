import React, { useState } from 'react';
import { DollarSign, CreditCard, Receipt, Download, Calendar, ChevronDown } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const transactions = [
  {
    id: 1,
    type: 'Tuition Fee',
    amount: 1500,
    status: 'paid',
    date: '2025-03-01',
    receipt: 'REC001',
  },
  {
    id: 2,
    type: 'Library Fee',
    amount: 100,
    status: 'pending',
    date: '2025-03-15',
  },
  {
    id: 3,
    type: 'Laboratory Fee',
    amount: 200,
    status: 'paid',
    date: '2025-02-15',
    receipt: 'REC002',
  },
  {
    id: 4,
    type: 'Activity Fee',
    amount: 150,
    status: 'overdue',
    date: '2025-02-01',
  },
];

const FeesPage = () => {
  const [selectedSemester, setSelectedSemester] = useState('Spring 2025');
  
  const totalFees = transactions.reduce((sum, t) => sum + t.amount, 0);
  const paidFees = transactions
    .filter(t => t.status === 'paid')
    .reduce((sum, t) => sum + t.amount, 0);
  const pendingFees = totalFees - paidFees;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fees & Payments</h1>
          <p className="text-gray-600">Manage your fees and view payment history</p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            leftIcon={<Download size={16} />}
          >
            Download Statement
          </Button>
          <Button className="flex items-center gap-2" leftIcon={<CreditCard size={16} />}>
            Pay Fees
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-primary-100 p-3">
                <DollarSign className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Fees</p>
                <h3 className="text-2xl font-bold text-gray-900">${totalFees}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-success-100 p-3">
                <Receipt className="h-6 w-6 text-success-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Paid Amount</p>
                <h3 className="text-2xl font-bold text-gray-900">${paidFees}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-error-100 p-3">
                <Calendar className="h-6 w-6 text-error-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Amount</p>
                <h3 className="text-2xl font-bold text-gray-900">${pendingFees}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment History</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="flex items-center rounded-md border px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  {selectedSemester}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
              </div>
              <Button variant="outline" size="sm">
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-4 text-sm font-medium text-gray-500">Transaction ID</th>
                  <th className="pb-4 text-sm font-medium text-gray-500">Type</th>
                  <th className="pb-4 text-sm font-medium text-gray-500">Amount</th>
                  <th className="pb-4 text-sm font-medium text-gray-500">Date</th>
                  <th className="pb-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="pb-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="py-4">
                      <div className="font-medium">#{transaction.id.toString().padStart(6, '0')}</div>
                    </td>
                    <td className="py-4">{transaction.type}</td>
                    <td className="py-4">${transaction.amount}</td>
                    <td className="py-4">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="py-4">
                      <Badge
                        variant={
                          transaction.status === 'paid'
                            ? 'success'
                            : transaction.status === 'pending'
                            ? 'warning'
                            : 'error'
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        {transaction.status === 'pending' || transaction.status === 'overdue' ? (
                          <Button size="sm">Pay Now</Button>
                        ) : (
                          <Button variant="outline" size="sm" leftIcon={<Download size={14} />}>
                            Receipt
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t px-6 py-4">
          <div className="text-sm text-gray-500">Showing 4 transactions</div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions
                .filter((t) => t.status !== 'paid')
                .map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <div className="font-medium">{transaction.type}</div>
                      <div className="text-sm text-gray-500">
                        Due: {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">${transaction.amount}</div>
                        <Badge
                          variant={transaction.status === 'pending' ? 'warning' : 'error'}
                          size="sm"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                      <Button size="sm">Pay Now</Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-primary-100 p-2">
                      <CreditCard className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-gray-500">Visa, Mastercard, American Express</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Add Card
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-success-100 p-2">
                      <DollarSign className="h-5 w-5 text-success-600" />
                    </div>
                    <div>
                      <div className="font-medium">Bank Transfer</div>
                      <div className="text-sm text-gray-500">Direct bank transfer</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-warning-100 p-2">
                      <Receipt className="h-5 w-5 text-warning-600" />
                    </div>
                    <div>
                      <div className="font-medium">Cash Payment</div>
                      <div className="text-sm text-gray-500">Pay at the accounts office</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Get Receipt
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeesPage;