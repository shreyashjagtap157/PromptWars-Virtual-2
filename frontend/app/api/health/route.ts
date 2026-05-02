import { NextResponse } from 'next/server';

export async function GET() {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
  
  try {
    const response = await fetch(`${backendUrl}/healthz`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!response.ok) {
      return NextResponse.json({ 
        status: 'degraded', 
        backend: 'unreachable',
        timestamp: new Date().toISOString() 
      }, { status: 503 });
    }
    
    const backendData = await response.json();
    return NextResponse.json({
      status: 'ok',
      frontend: 'healthy',
      backend: backendData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
