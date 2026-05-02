import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReaderControls } from '../components/guide/ReaderControls';
import { useTTS } from '../hooks/useTTS';

// Mock useTTS hook
vi.mock('../hooks/useTTS', () => ({
  useTTS: vi.fn(),
}));

describe('ReaderControls', () => {
  const mockSpeak = vi.fn();
  const mockStop = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTTS as any).mockReturnValue({
      speak: mockSpeak,
      stop: mockStop,
      isSpeaking: false,
      isSupported: true,
    });
  });

  it('should render "Listen" button when not speaking', () => {
    render(<ReaderControls text="Hello world" />);
    expect(screen.getByText('Listen')).toBeDefined();
    expect(screen.queryByText('Stop')).toBeNull();
  });

  it('should render "Stop" button when speaking', () => {
    (useTTS as any).mockReturnValue({
      speak: mockSpeak,
      stop: mockStop,
      isSpeaking: true,
      isSupported: true,
    });
    render(<ReaderControls text="Hello world" />);
    expect(screen.getByText('Stop')).toBeDefined();
    expect(screen.queryByText('Listen')).toBeNull();
  });

  it('should call speak when "Listen" is clicked', () => {
    render(<ReaderControls text="Hello world" />);
    fireEvent.click(screen.getByText('Listen'));
    expect(mockSpeak).toHaveBeenCalledWith('Hello world');
  });

  it('should call stop when "Stop" is clicked', () => {
    (useTTS as any).mockReturnValue({
      speak: mockSpeak,
      stop: mockStop,
      isSpeaking: true,
      isSupported: true,
    });
    render(<ReaderControls text="Hello world" />);
    fireEvent.click(screen.getByText('Stop'));
    expect(mockStop).toHaveBeenCalled();
  });

  it('should render nothing if TTS is not supported', () => {
    (useTTS as any).mockReturnValue({
      speak: mockSpeak,
      stop: mockStop,
      isSpeaking: false,
      isSupported: false,
    });
    const { container } = render(<ReaderControls text="Hello world" />);
    expect(container.firstChild).toBeNull();
  });
});
