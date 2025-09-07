"use client";

import React, { useCallback, useMemo, useState } from "react";

export default function TestProductPage() {
  const [idInput, setIdInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const canFetch = useMemo(() => {
    const n = Number(idInput);
    return Number.isFinite(n) && n > 0;
  }, [idInput]);

  const handleFetch = useCallback(async () => {
    setError(null);
    setResult(null);
    const id = idInput.trim();
    if (!id || isNaN(parseInt(id, 10))) {
      setError("Please enter a valid numeric product ID");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || `Request failed with status ${res.status}`);
        setResult(null);
      } else {
        setResult(data);
      }
    } catch (e: any) {
      setError(e?.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [idInput]);

  return (
    <main className="container py-4" style={{ maxWidth: 900 }}>
      <h1 className="mb-3">Test: Get Product By ID</h1>
      <p className="text-muted">
        Enter a numeric product ID and fetch details via the server action. This
        calls <code>/api/products/[id]</code> which internally uses
        <code>getProductById</code>.
      </p>

      <div className="card p-3 mb-3">
        <label htmlFor="productId" className="form-label fw-semibold">
          Product ID
        </label>
        <div className="d-flex gap-2 align-items-center">
          <input
            id="productId"
            type="number"
            className="form-control"
            placeholder="e.g. 20738850"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && canFetch) {
                handleFetch();
              }
            }}
          />
          <button
            className="btn btn-primary"
            disabled={!canFetch || loading}
            onClick={handleFetch}
          >
            {loading ? "Fetching..." : "Fetch"}
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              setIdInput("");
              setResult(null);
              setError(null);
            }}
          >
            Reset
          </button>
        </div>
        <div className="small text-muted mt-2">
          Quick samples: 20738850, 20588753, 20517139
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {result && (
        <div className="card p-3">
          <h5 className="mb-2">Response</h5>
          <pre
            className="bg-light p-2"
            style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}
