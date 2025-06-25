import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageContext } from '@/App';
import { LanguageSwitcher, CompactLanguageSwitcher } from '../LanguageSwitcher';

// Mock context value
const mockContextValue = {
  language: 'en' as const,
  toggleLanguage: jest.fn(),
  setLanguage: jest.fn(),
  isEnglishWord: jest.fn(),
  t: jest.fn((key: string) => key),
};

const renderWithContext = (component: React.ReactElement, contextValue = mockContextValue) => {
  return render(
    <LanguageContext.Provider value={contextValue}>
      {component}
    </LanguageContext.Provider>
  );
};

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct initial language', () => {
    renderWithContext(<LanguageSwitcher />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('中文');
  });

  it('shows English when current language is Chinese', () => {
    const chineseContext = { ...mockContextValue, language: 'zh' as const };
    renderWithContext(<LanguageSwitcher />, chineseContext);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('English');
  });

  it('calls toggleLanguage when clicked', () => {
    renderWithContext(<LanguageSwitcher />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockContextValue.toggleLanguage).toHaveBeenCalledTimes(1);
  });

  it('has correct accessibility attributes', () => {
    renderWithContext(<LanguageSwitcher />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Switch to 中文');
  });
});

describe('CompactLanguageSwitcher', () => {
  it('renders compact version correctly', () => {
    renderWithContext(<CompactLanguageSwitcher />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('中');
    expect(button).toHaveClass('w-8', 'h-8');
  });

  it('shows EN when language is Chinese', () => {
    const chineseContext = { ...mockContextValue, language: 'zh' as const };
    renderWithContext(<CompactLanguageSwitcher />, chineseContext);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('EN');
  });
});

describe('Language Context Integration', () => {
  it('handles missing context gracefully', () => {
    // This would normally throw an error in useLanguage hook
    // but we're testing the component behavior
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<LanguageSwitcher />);
    }).toThrow('useLanguage must be used within a LanguageContext.Provider');
    
    consoleSpy.mockRestore();
  });
});
