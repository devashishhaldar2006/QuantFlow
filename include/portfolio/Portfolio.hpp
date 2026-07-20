#pragma once

class Portfolio {
private:
    double cash_;
    int position_;
    double lastPrice_;

public:
    explicit Portfolio(double initialCash);

    void buy(int quantity, double price);

    void sell(int quantity, double price);
    
    void updateMarketPrice(double price);
    
    double cash() const;

    int position() const;

    double totalValue() const;
};