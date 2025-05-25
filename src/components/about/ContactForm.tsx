'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const t = useTranslations('about.contact');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          {t('formTitle')}
        </CardTitle>
        <CardDescription>
          {t('formDescription')}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('form.name')}</Label>
              <Input
                id="name"
                type="text"
                placeholder={t('form.namePlaceholder')}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('form.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('form.emailPlaceholder')}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">{t('form.subject')}</Label>
            <Input
              id="subject"
              type="text"
              placeholder={t('form.subjectPlaceholder')}
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t('form.message')}</Label>
            <Textarea
              id="message"
              placeholder={t('form.messagePlaceholder')}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              required
              disabled={isSubmitting}
              rows={5}
            />
          </div>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg"
            >
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">{t('form.successMessage')}</span>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
            >
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{t('form.errorMessage')}</span>
            </motion.div>
          )}

          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              />
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                {t('form.submit')}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
