"""Stripe session record for donations-in-progress

Revision ID: 4aa0ecfc9727
Revises: c58942fe6b16
Create Date: 2019-10-11 00:41:17.038690

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4aa0ecfc9727'
down_revision = 'ce7b856bc59d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('donations', sa.Column('payment_finalized', sa.Boolean(), nullable=True))
    op.execute("UPDATE donations SET payment_finalized = FALSE")
    op.alter_column('donations', 'payment_finalized', nullable=False)
    op.add_column('donations', sa.Column('stripe_session', sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('donations', 'stripe_session')
    op.drop_column('donations', 'payment_finalized')
    # ### end Alembic commands ###