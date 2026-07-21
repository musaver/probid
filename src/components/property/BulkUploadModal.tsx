"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";

interface ImportedProperty {
    Title?: string;
    "Sale ID"?: string;
    "Parcel ID"?: string;
    Address?: string;
    City?: string;
    "Zip Code"?: number | string;
    "Minimum Bid"?: number;
    "Winning Bid"?: number;
    "Bidder Email"?: string;
    "Auction End Date"?: string; // YYYY-MM-DD
    "Owners"?: string; // Comma or semicolon separated
    "Status"?: string;
}

export default function BulkUploadModal({ onClose }: { onClose: () => void }) {
    const [file, setFile] = useState<File | null>(null);
    const [data, setData] = useState<ImportedProperty[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [stage, setStage] = useState<"select" | "preview">("select");
    const [bidders, setBidders] = useState<any[]>([]);
    const [loadingBidders, setLoadingBidders] = useState(false);

    const downloadTemplate = (ext: "xlsx" | "xls" | "csv") => {
        const headers = [
            "Sale ID",
            "Parcel ID",
            "Address",
            "City",
            "Zip Code",
            "Minimum Bid",
            "Winning Bid",
            "Bidder Email",
            "Auction End Date",
            "Owners",
            "Status",
        ];
        const sampleData = [
            {
                "Sale ID": "2025-0001",
                "Parcel ID": "12-34-567",
                Address: "123 Main St",
                City: "Anytown",
                "Zip Code": "12345",
                "Minimum Bid": 1000,
                "Winning Bid": 1200,
                "Bidder Email": "bidder@example.com",
                "Auction End Date": "2026-12-31",
                "Owners": "Doe, John; Smith, Jane",
                "Status": "active",
            },
            {
                "Sale ID": "2025-0002",
                "Parcel ID": "12-34-568",
                Address: "0 Oak Ave",
                City: "Anytown",
                "Zip Code": "12345",
                "Minimum Bid": 500,
                "Winning Bid": 0,
                "Bidder Email": "",
                "Auction End Date": "2026-12-31",
                "Owners": "Brown, Bob",
                "Status": "active",
            },
        ];

        const ws = XLSX.utils.json_to_sheet(sampleData, { header: headers });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Template");
        XLSX.writeFile(wb, `BidBridge_Property_Template.${ext}`);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const parseFile = async () => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            const bstr = e.target?.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const jsonData = XLSX.utils.sheet_to_json<ImportedProperty>(ws);
            setData(jsonData);
            validateData(jsonData);

            // Fetch bidders if not already loaded
            if (bidders.length === 0) {
                setLoadingBidders(true);
                try {
                    const res = await fetch("/api/users/bidders");
                    if (res.ok) {
                        const list = await res.json();
                        setBidders(list);
                    }
                } catch (err) {
                    console.error("Failed to load bidders for check:", err);
                } finally {
                    setLoadingBidders(false);
                }
            }

            setStage("preview");
        };
        reader.readAsBinaryString(file);
    };

    const validateData = (items: ImportedProperty[]) => {
        const newErrors: string[] = [];
        if (items.length === 0) {
            newErrors.push("File appears to be empty.");
            setErrors(newErrors);
            return;
        }

        items.forEach((item, index) => {
            // Relaxed validation: a row just needs something to identify it.
            // Sale ID is the key field (and NOT NULL in the DB); if it's absent the
            // importer falls back to Parcel ID, so require at least one of them.
            if (!item["Sale ID"] && !item["Parcel ID"]) {
                newErrors.push(`Row ${index + 2}: needs a 'Sale ID' (or at least a 'Parcel ID').`);
            }
        });
        setErrors(newErrors);
    };

    const handleUpload = async () => {
        setUploading(true);
        try {
            const res = await fetch("/api/properties/bulk", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ properties: data }),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Upload failed");
            }

            // Reload the page to refresh the properties list
            window.location.reload();
        } catch (err: any) {
            alert(`Error: ${err.message}`);
        } finally {
            setUploading(false);
        }
    };

    const updateRowEmail = (index: number, email: string) => {
        const newData = [...data];
        newData[index]["Bidder Email"] = email;
        setData(newData);
    };

    const getBidderStatus = (email?: string) => {
        if (!email) return null;
        const found = bidders.find(b => b.email.toLowerCase() === email.toLowerCase());
        return found ? { connected: true, name: found.name } : { connected: false };
    };

    return (
        <div className="app-modal-overlay" onClick={onClose}>
            <div className="app-modal app-modal--lg" onClick={(e) => e.stopPropagation()}>
                <div className="app-modal-header">
                    <h2 className="app-modal-title">Batch Import Properties</h2>
                    <button onClick={onClose} className="app-modal-close">×</button>
                </div>

                {stage === "select" ? (
                    <div style={{ marginTop: "20px" }}>
                        <div style={{ background: "#F3F4F6", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
                            <p style={{ marginBottom: "12px", fontWeight: 500 }}>Step 1: Download a template</p>
                            <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
                                <button
                                    onClick={() => downloadTemplate("xlsx")}
                                    className="action-btn action-btn-secondary"
                                >
                                    <i className="bi bi-file-earmark-spreadsheet"></i> Excel (.xlsx)
                                </button>
                                <button
                                    onClick={() => downloadTemplate("csv")}
                                    className="action-btn action-btn-secondary"
                                >
                                    <i className="bi bi-filetype-csv"></i> CSV
                                </button>
                                <button
                                    onClick={() => downloadTemplate("xls")}
                                    className="action-btn action-btn-secondary"
                                >
                                    <i className="bi bi-file-earmark-excel"></i> Excel 97-2003 (.xls)
                                </button>
                            </div>
                        </div>
                        <div style={{ marginTop: "20px", textAlign: "center" }}>
                            <p style={{ marginBottom: "12px", fontWeight: 500 }}>Step 2: Upload your file</p>
                            <input
                                type="file"
                                accept=".csv, .xlsx, .xls"
                                onChange={handleFileChange}
                                style={{ display: "block", margin: "0 auto", padding: "10px" }}
                            />
                        </div>

                        <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                            <button onClick={onClose} className="action-btn action-btn-secondary">Cancel</button>
                            <button
                                onClick={parseFile}
                                disabled={!file}
                                className="action-btn action-btn-primary"
                                style={{ opacity: !file ? 0.5 : 1 }}
                            >
                                Next: Preview
                            </button>
                        </div>
                    </div>
                ) : (
                    <div style={{ marginTop: "20px" }}>
                        {errors.length > 0 ? (
                            <div style={{ background: "#FEF2F2", color: "#991B1B", padding: "12px", borderRadius: "8px", marginBottom: "16px", maxHeight: "150px", overflowY: "auto" }}>
                                <strong>Validation Errors:</strong>
                                <ul style={{ margin: "8px 0 0 20px", padding: 0 }}>
                                    {errors.map((err, i) => <li key={i}>{err}</li>)}
                                </ul>
                            </div>
                        ) : (
                            <div style={{ background: "#ECFDF5", color: "#065F46", padding: "12px", borderRadius: "8px", marginBottom: "16px" }}>
                                <i className="bi bi-check-circle-fill"></i> Ready to import <strong>{data.length}</strong> properties.
                            </div>
                        )}

                        <div style={{ maxHeight: "300px", overflowY: "auto", overflowX: "auto", border: "1px solid #E5E7EB", borderRadius: "8px" }}>
                            <table style={{ width: "100%", fontSize: "14px", borderCollapse: "collapse" }}>
                                <thead style={{ background: "#F9FAFB", position: "sticky", top: 0 }}>
                                    <tr>
                                        <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #E5E7EB", whiteSpace: "nowrap" }}>Sale ID</th>
                                        <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #E5E7EB", whiteSpace: "nowrap" }}>Parcel ID</th>
                                        <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #E5E7EB", whiteSpace: "nowrap" }}>Address</th>
                                        <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #E5E7EB", whiteSpace: "nowrap" }}>City</th>
                                        <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #E5E7EB", whiteSpace: "nowrap" }}>Zip Code</th>
                                        <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #E5E7EB", whiteSpace: "nowrap" }}>Min Bid</th>
                                        <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #E5E7EB", whiteSpace: "nowrap" }}>Winning Bid</th>
                                        <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #E5E7EB", whiteSpace: "nowrap" }}>Bidder Email</th>
                                        <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #E5E7EB", whiteSpace: "nowrap" }}>Auction End</th>
                                        <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #E5E7EB", whiteSpace: "nowrap" }}>Owners</th>
                                        <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #E5E7EB", whiteSpace: "nowrap" }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.slice(0, 50).map((row, i) => (
                                        <tr key={i} style={{ borderBottom: "1px solid #F3F4F6" }}>
                                            <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{row["Sale ID"] || row["Parcel ID"] || <span style={{ color: "red" }}>Missing</span>}</td>
                                            <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{row["Parcel ID"] || "-"}</td>
                                            <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{row.Address || "-"}</td>
                                            <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{row.City || "-"}</td>
                                            <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{row["Zip Code"] || "-"}</td>
                                            <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{row["Minimum Bid"] || "-"}</td>
                                            <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{row["Winning Bid"] || "-"}</td>
                                            <td style={{ padding: "8px", whiteSpace: "nowrap" }}>
                                                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                                    <input
                                                        type="text"
                                                        value={row["Bidder Email"] || ""}
                                                        onChange={(e) => updateRowEmail(i, e.target.value)}
                                                        placeholder="bidder@email.com"
                                                        style={{
                                                            fontSize: "12px",
                                                            padding: "4px 8px",
                                                            borderRadius: "4px",
                                                            border: "1px solid #D1D5DB",
                                                            width: "180px"
                                                        }}
                                                    />
                                                    {loadingBidders ? (
                                                        <span style={{ fontSize: "10px", color: "#6B7280" }}>Checking...</span>
                                                    ) : row["Bidder Email"] ? (
                                                        (() => {
                                                            const status = getBidderStatus(row["Bidder Email"]);
                                                            return status?.connected ? (
                                                                <span style={{ fontSize: "10px", color: "#059669", fontWeight: 600 }}>
                                                                    <i className="bi bi-person-check-fill"></i> Connected: {status.name || "User"}
                                                                </span>
                                                            ) : (
                                                                <span style={{ fontSize: "10px", color: "#DC2626", fontWeight: 600 }}>
                                                                    <i className="bi bi-person-x-fill"></i> Not Found (Will not link)
                                                                </span>
                                                            );
                                                        })()
                                                    ) : null}
                                                </div>
                                            </td>
                                            <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{row["Auction End Date"] || "-"}</td>
                                            <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{row.Owners || "-"}</td>
                                            <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{row.Status || "-"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {data.length > 50 && <div style={{ padding: "8px", textAlign: "center", color: "#6B7280" }}>And {data.length - 50} more...</div>}
                        </div>

                        <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                            <button
                                onClick={() => setStage("select")}
                                className="action-btn action-btn-secondary"
                                disabled={uploading}
                            >
                                Back
                            </button>
                            <button
                                onClick={handleUpload}
                                disabled={errors.length > 0 || uploading}
                                className="action-btn action-btn-primary"
                                style={{ opacity: errors.length > 0 || uploading ? 0.5 : 1 }}
                            >
                                {uploading ? "Importing..." : "Import Properties"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
