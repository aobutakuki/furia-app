import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import "./Analytics.css";

Chart.register(...registerables);

function Analytics() {
    const [analyticsData, setAnalyticsData] = useState({
        totalUsers: 0,
        popularTopics: [],
        frequentQuestions: [],
        activeTimes: []
    });

    // Player preference by age (stacked bar)
    const favoritePlayersByAge = {
        labels: ["16-18", "19-21", "22-25", "26-30", "31+"],
        datasets: [
            {
                label: "KSCERATO",
                data: [35, 42, 28, 15, 8],
                backgroundColor: "#f58020",
            },
            {
                label: "yuurih",
                data: [28, 35, 22, 12, 5],
                backgroundColor: "#ffa54f",
            },
            {
                label: "FalleN",
                data: [15, 18, 25, 20, 15],
                backgroundColor: "#ffc085",
            },
            {
                label: "Outros",
                data: [10, 12, 8, 5, 3],
                backgroundColor: "#333333",
            }
        ]
    };

    // Business-focused metrics
    const conversionMetrics = {
        labels: ["Jogadores", "Partidas", "História", "Estatísticas", "Produtos"],
        datasets: [
            {
                label: "Taxa de Engajamento",
                data: [78, 65, 42, 55, 89],
                backgroundColor: "#f58020",
                borderColor: "#ffa54f",
                borderWidth: 1
            },
            {
                label: "Conversão em Vendas",
                data: [12, 8, 5, 7, 35],
                backgroundColor: "#4a8fe7",
                borderColor: "#6ba3eb",
                borderWidth: 1
            }
        ]
    };

    const interactionFrequency = {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        datasets: [
            {
                label: "Interações totais",
                data: [320, 450, 380, 510, 490, 280, 210],
                borderColor: "#f58020",
                backgroundColor: "rgba(245, 128, 32, 0.1)",
                tension: 0.3,
                fill: true
            },
            {
                label: "Cliques em produtos",
                data: [45, 68, 52, 89, 75, 32, 18],
                borderColor: "#4a8fe7",
                backgroundColor: "rgba(74, 143, 231, 0.1)",
                tension: 0.3,
                fill: true
            }
        ]
    };

    useEffect(() => {
        const simulateDataAnalysis = async () => {
            const simulatedData = {
                totalUsers: 128,
                popularTopics: [
                    { topic: "players", count: 87 },
                    { topic: "matches", count: 65 },
                    { topic: "merch", count: 42 },
                    { topic: "history", count: 31 },
                    { topic: "stats", count: 28 }
                ],
                frequentQuestions: [
                    { question: "Quem é o capitão da FURIA?", count: 45 },
                    { question: "Quando é o próximo jogo?", count: 38 },
                    { question: "Onde comprar camisas?", count: 27 },
                    { question: "Qual o elenco atual?", count: 23 },
                    { question: "Quantos títulos a FURIA tem?", count: 19 }
                ],
                activeTimes: [
                    { hour: "18-20", count: 58 },
                    { hour: "20-22", count: 47 },
                    { hour: "16-18", count: 32 },
                    { hour: "14-16", count: 25 },
                    { hour: "12-14", count: 18 }
                ]
            };
            setAnalyticsData(simulatedData);
        };
        simulateDataAnalysis();
    }, []);

    return (
        <div className="analytics-container">
            <h2>User Interaction Analytics</h2>
            <p className="subtitle">Insights from {analyticsData.totalUsers} users</p>
            
            {/* Stats Cards Row */}
            <div className="stats-row">
                <div className="stat-card">
                    <h3>Top Interesses</h3>
                    <ul>
                        {analyticsData.popularTopics.slice(0, 3).map((topic, index) => (
                            <li key={index}>
                                <span className="stat-label">{topic.topic}</span>
                                <span className="stat-value">{topic.count}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="stat-card">
                    <h3>Perguntas Frequentes</h3>
                    <ul>
                        {analyticsData.frequentQuestions.slice(0, 3).map((question, index) => (
                            <li key={index}>
                                <span className="stat-label">"{question.question.substring(0, 20)}..."</span>
                                <span className="stat-value">{question.count}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="stat-card">
                    <h3>Horários de Pico</h3>
                    <ul>
                        {analyticsData.activeTimes.slice(0, 3).map((time, index) => (
                            <li key={index}>
                                <span className="stat-label">{time.hour}h</span>
                                <span className="stat-value">{time.count}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Demographic Insight */}
            <div className="chart-row">
                <div className="chart-wrapper">
                    <h3>Preferência de Jogadores por Faixa Etária</h3>
                    <div className="chart-container">
                        <Bar
                            data={favoritePlayersByAge}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: function(context) {
                                                return `${context.dataset.label}: ${context.raw}%`;
                                            }
                                        }
                                    }
                                },
                                scales: {
                                    x: { stacked: true },
                                    y: { 
                                        stacked: true, 
                                        beginAtZero: true,
                                        ticks: {
                                            callback: function(value) {
                                                return value + '%';
                                            }
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                    <div className="chart-note">
                        <p>Jogadores mais jovens preferem KSCERATO (42% na faixa 19-21)</p>
                    </div>
                </div>
            </div>

            {/* Business Metrics Row */}
            <div className="chart-row">
                <div className="chart-wrapper half-width">
                    <h3>Eficiência de Conversão</h3>
                    <div className="chart-container">
                        <Bar
                            data={conversionMetrics}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: function(context) {
                                                return `${context.dataset.label}: ${context.raw}%`;
                                            }
                                        }
                                    },
                                    legend: {
                                        position: 'top',
                                    }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        max: 100,
                                        ticks: {
                                            callback: function(value) {
                                                return value + '%';
                                            }
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                    <div className="chart-note">
                        <p>Discussões sobre produtos convertem 4× mais que outros tópicos</p>
                    </div>
                </div>

                <div className="chart-wrapper half-width">
                    <h3>Engajamento Semanal</h3>
                    <div className="chart-container">
                        <Line
                            data={interactionFrequency}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: function(context) {
                                                return `${context.dataset.label}: ${context.raw}`;
                                            }
                                        }
                                    }
                                },
                                scales: {
                                    y: { beginAtZero: true }
                                }
                            }}
                        />
                    </div>
                    <div className="chart-note">
                        <p>Quinta-feira tem 45% mais engajamento que a média</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;