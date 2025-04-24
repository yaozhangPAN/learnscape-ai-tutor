import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const WrongQuestions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen">
      <h1>错题本</h1>
      {/* Add your wrong questions content here */}
    </div>
  );
};

export default WrongQuestions;
