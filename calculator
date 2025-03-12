import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Calculator as CalculatorIcon, RefreshCcw } from "lucide-react";

export default function Calculator() {
  // משכנתא הפוכה
  const [propertyValue, setPropertyValue] = useState("");
  const [age, setAge] = useState("");
  const [reverseMortgageResult, setReverseMortgageResult] = useState(null);

  // איחוד הלוואות
  const [loans, setLoans] = useState([{ amount: "", interest: "", months: "" }]);
  const [consolidationResult, setConsolidationResult] = useState(null);

  const calculateReverseMortgage = () => {
    const value = parseFloat(propertyValue);
    const currentAge = parseInt(age);
    
    if (isNaN(value) || isNaN(currentAge)) {
      alert("אנא הכנס ערכים תקינים");
      return;
    }
    
    if (currentAge < 60) {
      alert("משכנתא הפוכה זמינה מגיל 60 ומעלה");
      return;
    }

    // חישוב משוער - יש להתאים לפי כללי הבנק
    const maxLoanPercentage = Math.min(0.5 + (currentAge - 60) * 0.01, 0.75);
    const maxLoan = value * maxLoanPercentage;
    const monthlyPayment = maxLoan / ((100 - currentAge) * 12);

    setReverseMortgageResult({
      maxLoan: maxLoan,
      monthlyPayment: monthlyPayment
    });
  };

  const addLoan = () => {
    setLoans([...loans, { amount: "", interest: "", months: "" }]);
  };

  const removeLoan = (index) => {
    const newLoans = loans.filter((_, i) => i !== index);
    setLoans(newLoans);
  };

  const updateLoan = (index, field, value) => {
    const newLoans = [...loans];
    newLoans[index][field] = value;
    setLoans(newLoans);
  };

  const calculateConsolidation = () => {
    let totalAmount = 0;
    let weightedInterest = 0;
    let maxMonths = 0;

    // בדיקת תקינות
    let isValid = true;
    
    loans.forEach(loan => {
      const amount = parseFloat(loan.amount);
      const interest = parseFloat(loan.interest);
      const months = parseInt(loan.months);

      if (isNaN(amount) || isNaN(interest) || isNaN(months)) {
        isValid = false;
        return;
      }

      totalAmount += amount;
      weightedInterest += (amount * interest);
      maxMonths = Math.max(maxMonths, months);
    });

    if (!isValid || totalAmount === 0) {
      alert("אנא הכנס ערכים תקינים לכל ההלוואות");
      return;
    }

    const averageInterest = weightedInterest / totalAmount;
    
    // חישוב תשלום חודשי בשיטת שפיצר
    const monthlyRate = averageInterest / 1200;
    const monthlyPayment = totalAmount * monthlyRate * Math.pow(1 + monthlyRate, maxMonths) / 
                          (Math.pow(1 + monthlyRate, maxMonths) - 1);

    setConsolidationResult({
      totalAmount,
      averageInterest,
      monthlyPayment,
      months: maxMonths
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">מחשבון משכנתאות</h1>
      
      <Tabs defaultValue="reverse" dir="rtl">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="reverse" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            משכנתא הפוכה
          </TabsTrigger>
          <TabsTrigger value="consolidation" className="flex items-center gap-2">
            <RefreshCcw className="w-4 h-4" />
            איחוד הלוואות
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reverse">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalculatorIcon className="w-5 h-5" />
                חישוב משכנתא הפוכה
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>שווי הנכס</Label>
                <Input
                  type="number"
                  placeholder="הכנס את שווי הנכס"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>גיל</Label>
                <Input
                  type="number"
                  placeholder="הכנס את גילך"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <Button onClick={calculateReverseMortgage} className="w-full">
                חשב
              </Button>

              {reverseMortgageResult && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-2">
                  <p className="font-semibold">תוצאות החישוב:</p>
                  <p>סכום הלוואה מקסימלי: ₪{Math.round(reverseMortgageResult.maxLoan).toLocaleString()}</p>
                  <p>תשלום חודשי משוער: ₪{Math.round(reverseMortgageResult.monthlyPayment).toLocaleString()}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consolidation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalculatorIcon className="w-5 h-5" />
                חישוב איחוד הלוואות
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loans.map((loan, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">הלוואה {index + 1}</h3>
                    {index > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLoan(index)}
                      >
                        הסר
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>יתרת ההלוואה</Label>
                      <Input
                        type="number"
                        placeholder="סכום"
                        value={loan.amount}
                        onChange={(e) => updateLoan(index, "amount", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>ריבית שנתית (%)</Label>
                      <Input
                        type="number"
                        placeholder="ריבית"
                        value={loan.interest}
                        onChange={(e) => updateLoan(index, "interest", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>יתרת תקופה (חודשים)</Label>
                      <Input
                        type="number"
                        placeholder="חודשים"
                        value={loan.months}
                        onChange={(e) => updateLoan(index, "months", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button onClick={addLoan} variant="outline" className="w-full">
                הוסף הלוואה
              </Button>

              <Button onClick={calculateConsolidation} className="w-full">
                חשב איחוד הלוואות
              </Button>

              {consolidationResult && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-2">
                  <p className="font-semibold">תוצאות החישוב:</p>
                  <p>סך כל ההלוואות: ₪{Math.round(consolidationResult.totalAmount).toLocaleString()}</p>
                  <p>ריבית ממוצעת: {consolidationResult.averageInterest.toFixed(2)}%</p>
                  <p>תשלום חודשי: ₪{Math.round(consolidationResult.monthlyPayment).toLocaleString()}</p>
                  <p>תקופת ההלוואה: {consolidationResult.months} חודשים</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
