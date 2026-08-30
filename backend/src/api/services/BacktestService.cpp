#include "api/services/BacktestService.hpp"

#include "api/dto/BacktestRequest.hpp"
#include "config/Config.hpp"
#include "io/CSVParser.hpp"
#include "market/MarketData.hpp"
#include "strategy/StrategyFactory.hpp"
#include "execution/ExecutionEngine.hpp"
#include "portfolio/Portfolio.hpp"
#include "risk/PositionSizer.hpp"
#include "risk/RiskManager.hpp"
#include "engine/BacktestEngine.hpp"
#include "analytics/PerformanceAnalyzer.hpp"
#include "analytics/PerformanceReport.hpp"

#include <iostream>

BacktestResult BacktestService::run(
    const BacktestRequest &request)
{
    Config config;

    config.csvFile = request.csvFile;
    config.strategy = request.strategy;
    config.initialCash = request.initialCash;
    config.commission = request.commission;
    config.stopLossPercent = request.stopLossPercent;
    config.takeProfitPercent = request.takeProfitPercent;
    config.slippage = request.slippage;

    // SMA Strategy
    config.shortMAPeriod = request.shortMAPeriod;
    config.longMAPeriod  = request.longMAPeriod;

    // RSI Strategy
    config.rsiPeriod  = request.rsiPeriod;
    config.oversold   = request.oversold;
    config.overbought = request.overbought;

    // EMA Cross Strategy
    config.fastEMAPeriod = request.fastEMAPeriod;
    config.slowEMAPeriod = request.slowEMAPeriod;

    // MACD Strategy
    config.macdFastPeriod   = request.macdFastPeriod;
    config.macdSlowPeriod   = request.macdSlowPeriod;
    config.macdSignalPeriod = request.macdSignalPeriod;

    // Bollinger Bands Strategy
    config.bollingerPeriod     = request.bollingerPeriod;
    config.bollingerMultiplier = request.bollingerMultiplier;

    // ATR Filter Strategy
    config.atrPeriod   = request.atrPeriod;
    config.minimumATR  = request.minimumATR;

    MarketData marketData =
        CSVParser::parse(config.csvFile);

    auto strategy = StrategyFactory::create(config);

    Portfolio portfolio(
        config.initialCash,
        config.commission,
        config.stopLossPercent,
        config.takeProfitPercent);

    PositionSizer positionSizer;

    ExecutionEngine executionEngine(
        portfolio,
        positionSizer,
        config.slippage);

    RiskManager riskManager(
        portfolio);

    BacktestEngine engine(
        marketData,
        *strategy,
        executionEngine,
        portfolio,
        riskManager);
    engine.run();

    PerformanceAnalyzer analyzer(portfolio);

    PerformanceReport report =
        analyzer.analyze();

    BacktestResult result;

    result.initialCapital =
        report.initialCapital;

    result.finalEquity =
        report.finalEquity;

    result.netProfit =
        report.netProfit;

    result.totalReturnPercent =
        report.totalReturnPercent;

    result.totalTrades =
        report.totalTrades;

    result.winningTrades =
        report.winningTrades;

    result.losingTrades =
        report.losingTrades;

    result.winRatePercent =
        report.winRatePercent;

    result.averageWin =
        report.averageWin;

    result.averageLoss =
        report.averageLoss;

    result.largestWin =
        report.largestWin;

    result.largestLoss =
        report.largestLoss;

    result.maximumDrawdown =
        report.maximumDrawdown;

    result.profitFactor =
        report.profitFactor;

    result.expectancy =
        report.expectancy;

    result.annualizedReturn =
        report.annualizedReturn;

    result.annualizedVolatility =
        report.annualizedVolatility;

    result.sharpeRatio =
        report.sharpeRatio;

    const auto &equityCurve = portfolio.getEquityCurve();

    result.equityCurve.reserve(equityCurve.size());

    for (const auto &point : equityCurve)
    {
        result.equityCurve.push_back(point);
    }

    const auto &trades = portfolio.getTrades();

    result.trades.reserve(trades.size());

    for (const Trade &trade : trades)
    {
        TradeResult tradeResult;

        tradeResult.timestamp = trade.getTimestamp();

        tradeResult.side =
            trade.getSide() == TradeSide::Buy
                ? "BUY"
                : "SELL";

        tradeResult.quantity =
            trade.getQuantity();

        tradeResult.executionPrice =
            trade.getExecutionPrice();

        tradeResult.commission =
            trade.getCommission();

        tradeResult.cashFlow =
            trade.getCashFlow();

        result.trades.push_back(tradeResult);
    }

    return result;
}
