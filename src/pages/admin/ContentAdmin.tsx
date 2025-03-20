
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { FileText, Save } from 'lucide-react';

interface ContentBlock {
  id: string;
  title: string;
  type: 'text' | 'richtext' | 'hero';
  content: string;
  location: string;
}

const ContentAdmin = () => {
  const { toast } = useToast();
  // Dummy content data - in a real app, this would come from an API
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
    {
      id: '1',
      title: 'Hero Title',
      type: 'text',
      content: 'MECADROMO',
      location: 'Home Page'
    },
    {
      id: '2',
      title: 'Product Description',
      type: 'richtext',
      content: 'Our 16" Black Bamboo Leather Strap combines elegance with sustainability. Crafted from premium leather with bamboo-inspired texturing, this strap offers both comfort and durability.',
      location: 'Product Detail'
    },
    {
      id: '3',
      title: 'Payment Info',
      type: 'richtext',
      content: 'Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.',
      location: 'Product Detail'
    },
  ]);

  const [selectedBlock, setSelectedBlock] = useState<ContentBlock | null>(null);
  const [editedContent, setEditedContent] = useState('');

  const handleSelectBlock = (block: ContentBlock) => {
    setSelectedBlock(block);
    setEditedContent(block.content);
  };

  const handleSaveContent = () => {
    if (!selectedBlock) return;
    
    const updatedBlocks = contentBlocks.map(block => 
      block.id === selectedBlock.id ? { ...block, content: editedContent } : block
    );
    
    setContentBlocks(updatedBlocks);
    
    toast({
      title: "Content updated",
      description: `The content for "${selectedBlock.title}" has been updated.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Content Management</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content blocks list */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Content Blocks</h2>
          <div className="space-y-3">
            {contentBlocks.map((block) => (
              <div 
                key={block.id}
                className={`p-3 border rounded-md cursor-pointer transition-colors ${
                  selectedBlock?.id === block.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleSelectBlock(block)}
              >
                <div className="flex items-center">
                  <FileText size={16} className="mr-2 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-sm">{block.title}</h3>
                    <p className="text-xs text-gray-500">{block.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Content editor */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          {selectedBlock ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">{selectedBlock.title}</h2>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {selectedBlock.location}
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  {selectedBlock.type === 'text' ? (
                    <Input 
                      value={editedContent} 
                      onChange={(e) => setEditedContent(e.target.value)} 
                    />
                  ) : (
                    <Textarea 
                      value={editedContent} 
                      onChange={(e) => setEditedContent(e.target.value)}
                      rows={6}
                    />
                  )}
                </div>
                
                <Button onClick={handleSaveContent}>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              Select a content block to edit
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentAdmin;
