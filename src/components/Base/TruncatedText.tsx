import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TruncatedTextProps {
  text: string;
  maxLength?: number;
  sx?: SxProps<Theme>;
  variant?: 'body2' | 'body1' | 'caption';
  color?: string;
}

export function TruncatedText({
  text,
  maxLength = 170,
  sx = {},
  variant = 'body2',
  color = 'text.primary',
}: TruncatedTextProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const isLong = text.length > maxLength;
  const displayedText = expanded || !isLong ? text : text.slice(0, maxLength) + '...';

  return (
    <Typography variant={variant} sx={{ whiteSpace: 'pre-line', color, ...sx }}>
      {displayedText}
      {isLong && (
        <Box
          component="span"
          sx={{
            ml: 1,
            color: 'primary.main',
            cursor: 'pointer',
            fontWeight: 500,
            textDecoration: 'underline',
            '&:hover': { textDecoration: 'none' },
          }}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? t('posts.comments.showLess') : t('posts.comments.showMore')}
        </Box>
      )}
    </Typography>
  );
}
